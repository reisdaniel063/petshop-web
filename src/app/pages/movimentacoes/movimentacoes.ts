import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MovimentacaoApi } from '../../services/movimentacao-api';
import { ProdutoApi } from '../../services/produto-api';
import { Produto } from '../../models/produto.model';
import { TipoMovimentacao, Movimentacao } from '../../models/movimentacao.model';

@Component({
  selector: 'app-movimentacoes',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './movimentacoes.html',
  styleUrl: './movimentacoes.css'
})
export class Movimentacoes implements OnInit {
  private readonly api = inject(MovimentacaoApi);
  private readonly produtoApi = inject(ProdutoApi);
  private readonly fb = inject(FormBuilder);

  produtos = signal<Produto[]>([]);
  salvando = signal(false);
  mensagem = signal<string | null>(null);
  erro = signal<string | null>(null);
  historico = signal<Movimentacao[]>([]);
  produtoSelecionado = signal<string>('');
  carregandoHistorico = signal(false);

  tipos = [
    { valor: TipoMovimentacao.Entrada, rotulo: 'Entrada' },
    { valor: TipoMovimentacao.Saida, rotulo: 'Saída' },
    { valor: TipoMovimentacao.Ajuste, rotulo: 'Ajuste' }
  ];

  form = this.fb.nonNullable.group({
    produtoId: ['', Validators.required],
    tipo: [TipoMovimentacao.Entrada, Validators.required],
    quantidade: [0, [Validators.required, Validators.min(0.001)]],
    observacao: ['']
  });

  ngOnInit(): void {
    this.produtoApi.listar().subscribe({
      next: (dados) => this.produtos.set(dados),
      error: (e) => console.error(e)
    });
  }

  salvar(): void {
    if (this.form.invalid) return;

    this.salvando.set(true);
    this.mensagem.set(null);
    this.erro.set(null);

    const dados = this.form.getRawValue();

    this.api.registrar({
      produtoId: dados.produtoId,
      tipo: Number(dados.tipo),
      quantidade: dados.quantidade,
      observacao: dados.observacao
    }).subscribe({
      next: () => {
        this.mensagem.set('Movimentação registrada com sucesso.');
        this.form.reset({ tipo: TipoMovimentacao.Entrada, quantidade: 0 });
        this.salvando.set(false);
      },
      error: (e) => {
        this.erro.set('Não foi possível registrar a movimentação.');
        this.salvando.set(false);
        console.error(e);
      }
    });
  }
  verHistorico(produtoId: string): void{
    this.produtoSelecionado.set(produtoId);
    if(!produtoId){
      this.historico.set([]);
      return;
    }

    this.carregandoHistorico.set(true);

    const ate = new Date();
    const de = new Date();
    de.setDate(de.getDate () - 120);

    this.api.listarPorProduto(
      produtoId,
      de.toISOString(),
      ate.toISOString(),
    ).subscribe({
      next: (dados) => {
        this.historico.set(dados);
        this.carregandoHistorico.set(false)
      },
      error: (e) => {
        this.carregandoHistorico.set(false)
        console.error(e)
      }
    })
  }
  rotuloTipo(tipo: number): string {
    return this.tipos.find(t => t.valor === tipo)?.rotulo ?? '=';
  }
}