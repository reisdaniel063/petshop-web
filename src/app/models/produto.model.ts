export interface Produto {
    id: string;
    nome: string;
    unidade: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    nomeFornecedor: string;
}
export interface CriarProduto {
    nome: string;
    unidade: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    fornecedorId: string;
}