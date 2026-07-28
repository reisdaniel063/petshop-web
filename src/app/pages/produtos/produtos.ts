import { Component, inject, signal, OnInit } from '@angular/core';
import { ProdutoApi } from '../../services/produto-api';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos implements OnInit {
  private readonly api = inject(ProdutoApi);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

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
  }
}