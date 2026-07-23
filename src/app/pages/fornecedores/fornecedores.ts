import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedorApi } from '../../services/fornecedor-api';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedores.html',
  styleUrl: './fornecedores.css'
})

export class Fornecedores implements OnInit {
  private api = inject(FornecedorApi);
  private readonly fb = inject(FormBuilder);


  fornecedores = signal<Fornecedor[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  salvando = signal(false);
  erroSalvar = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    contato: ['', Validators.required]
  })

  ngOnInit(): void {
    this.api.listar().subscribe({
      next: (dados) => {
        this.fornecedores.set(dados);
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set('Não foi possível carregar os fornecedores.');
        this.carregando.set(false);
        console.error(e);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) return;

    this.salvando.set(true);
    this.erroSalvar.set(null);

    this.api.criar(this.form.getRawValue()).subscribe({
      next: (novo) => {
        this.fornecedores.update(lista => [...lista, novo]);
        this.form.reset();
        this.salvando.set(false);
      },
      error: (e) => {
        this.erroSalvar.set('Não foi possível salvar o fornecedor.');
        this.salvando.set(false);
        console.error(e);
      }
    });
  }
}
