import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { OrdemDeCompraApi } from '../../services/ordem-de-compra-api';
import { FornecedorApi } from '../../services/fornecedor-api';
import { ProdutoApi } from '../../services/produto-api';
import { Fornecedor } from '../../models/fornecedor.model';
import { Produto } from '../../models/produto.model';
import { OrdemDeCompra as OrdemDeCompraModel } from '../../models/ordem-de-compra-model'

@Component({
  selector: 'app-ordem-de-compra',
  imports: [],
  templateUrl: './ordem-de-compra.html',
  styleUrl: './ordem-de-compra.css'
})
export class OrdemDeCompra implements OnInit {
  private readonly api = inject(OrdemDeCompraApi);
  private readonly fornecedorApi = inject(FornecedorApi);
  private readonly produtoApi = inject(ProdutoApi);

  fornecedores = signal<Fornecedor[]>([]);
  produtos = signal<Produto[]>([]);

  fornecedorSelecionado = signal<string>('');
  marcados = signal<Set<string>>(new Set());

  ordemGerada = signal<OrdemDeCompraModel | null>(null)
  gerando = signal(false);
  erro = signal<string | null>(null);

  produtosDoFornecedor = computed(() => {
    const id = this.fornecedorSelecionado();
    if (!id) return [];
    return this.produtos().filter(p => p.fornecedorId === id);
  });

  ngOnInit(): void {
    this.fornecedorApi.listar().subscribe({
      next: (dados) => this.fornecedores.set(dados),
      error: (e) => console.error(e)
    });

    this.produtoApi.listar().subscribe({
      next: (dados) => this.produtos.set(dados),
      error: (e) => console.error(e)
    });
  }

  selecionarFornecedor(id: string): void {
    this.fornecedorSelecionado.set(id);
    this.marcados.set(new Set());
  }

  alternar(produtoId: string): void {
    const novo = new Set(this.marcados());
    if (novo.has(produtoId)) {
      novo.delete(produtoId);
    } else {
      novo.add(produtoId);
    }
    this.marcados.set(novo);
  }
  gerar(): void {
    const fornecedorId = this.fornecedorSelecionado();
    const produtoIds = [...this.marcados()];

    if (!fornecedorId || produtoIds.length === 0) return;

    this.gerando.set(true);
    this.erro.set(null);
    this.ordemGerada.set(null);

    this.api.gerar({ fornecedorId, produtoIds }).subscribe({
      next: (ordem) => {
        this.ordemGerada.set(ordem);
        this.gerando.set(false);
      },
      error: (e) => {
        this.erro.set('Não foi possível gerar a ordem de compra.');
        this.gerando.set(false);
        console.error(e);
      }
    });
  }
}