export interface Produto {
    id: string;
    nome: string;
    unidade: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    fornecedorId: string;
    nomeFornecedor: string;
}
export interface CriarProduto {
    nome: string;
    unidade: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    fornecedorId: string;
}

export interface AtualizarProduto {
    nome: string;
    unidade: string;
    estoqueMinimo: number;
}