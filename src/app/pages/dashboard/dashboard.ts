import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ProdutoApi } from '../../services/produto-api';
import { Produto } from '../../models/produto.model'

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly produtoApi = inject(ProdutoApi);

  produtos = signal<Produto[]>([])

  carregando = signal(true);

  produtosEmAlerta = computed(() =>
    this.produtos().filter(p => p.estoqueAtual <= p.estoqueMinimo)
  );

  ngOnInit(): void {
    this.produtoApi.listar().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (e) => {
        this.carregando.set(false);
        console.error(e)
      }
    });
  }
}
