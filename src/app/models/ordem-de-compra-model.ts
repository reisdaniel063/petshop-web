export interface GerarOrdemDeCompra {
    fornecedorId: string;
    produtoIds: string []
}

export interface ItemOrdem {
    nomeProduto: string;
    unidade: string;
    mediaCalculada: number;
    estoqueAtual: number;
    quantidadeSugerida: number;
    necessitaCompra: boolean;
}
export interface OrdemDeCompra{
    id: string;
    nomeFornecedor: string;
    mes: number;
    ano: number;
    datGeracao: string;
    itens: ItemOrdem[];
}
