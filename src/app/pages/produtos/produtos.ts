import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoApi } from '../../services/produto-api';
import { FornecedorApi } from '../../services/fornecedor-api';
import { Produto } from '../../models/produto.model';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-produtos',
  imports: [ReactiveFormsModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  private readonly api = inject(ProdutoApi);
  private readonly fornecedorApi = inject(FornecedorApi);
  private readonly fb = inject(FormBuilder);

  produtos = signal<Produto[]>([]);
  fornecedores = signal<Fornecedor[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  salvando = signal(false);
  erroSalvar = signal<string | null>(null);

  editandoId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    unidade: ['', Validators.required],
    estoqueAtual: [0, Validators.required],
    estoqueMinimo: [0, Validators.required],
    fornecedorId: ['', Validators.required]
  });

  ngOnInit(): void {
    this.api.listar().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set('Não foi possível carregar os produtos.');
        this.carregando.set(false);
        console.error(e);
      }
    });

    this.fornecedorApi.listar().subscribe({
      next: (dados) => this.fornecedores.set(dados),
      error: (e) => console.error(e)
    });
  }

  editar(p: Produto): void {
    this.editandoId.set(p.id);
    this.erroSalvar.set(null);

    this.form.setValue({
      nome: p.nome,
      unidade: p.unidade,
      estoqueAtual: p.estoqueAtual,
      estoqueMinimo: p.estoqueMinimo,
      fornecedorId: ''
    });

    this.form.controls.estoqueAtual.disable();
    this.form.controls.fornecedorId.disable();
  }

  cancelarEdicao(): void {
    this.editandoId.set(null);
    this.form.controls.estoqueAtual.enable();
    this.form.controls.fornecedorId.enable();
    this.form.reset();
  }

  salvar(): void {
    if (this.form.invalid) return;

    this.salvando.set(true);
    this.erroSalvar.set(null);

    const id = this.editandoId();

    if (id) {
      const dados = this.form.getRawValue();
      this.api.atualizar(id, {
        nome: dados.nome,
        unidade: dados.unidade,
        estoqueMinimo: dados.estoqueMinimo
      }).subscribe({
        next: () => {
          this.produtos.update(lista =>
            lista.map(p =>
              p.id === id
                ? { ...p, nome: dados.nome, unidade: dados.unidade, estoqueMinimo: dados.estoqueMinimo }
                : p
            )
          );
          this.cancelarEdicao();
          this.salvando.set(false);
        },
        error: (e) => {
          this.erroSalvar.set('Não foi possível atualizar o produto.');
          this.salvando.set(false);
          console.error(e);
        }
      });
    } else {
      this.api.criar(this.form.getRawValue()).subscribe({
        next: (novo) => {
          this.produtos.update(lista => [...lista, novo]);
          this.form.reset();
          this.salvando.set(false);
        },
        error: (e) => {
          this.erroSalvar.set('Não foi possível salvar o produto.');
          this.salvando.set(false);
          console.error(e);
        }
      });
    }
  }
  excluir(p: Produto): void {
    const confirmado = confirm(`Excluir o produto "${p.nome}"?`);
    if (!confirmado) return;

    this.api.excluir(p.id).subscribe({
      next: () => {
        this.produtos.update(lista => lista.filter(x => x.id !== p.id));
      },
      error: (e) => {
        this.erroSalvar.set(
          'Não foi possível excluir. O produto pode ter movimentações ou estar em uma ordem de compra.'
        );
        console.error(e);
      }
    });
  }
}