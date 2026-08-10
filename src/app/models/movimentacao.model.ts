export enum TipoMovimentacao {
    Entrada = 0,
    Saida = 1,
    Ajuste = 2
}
export interface CriarMovimentacao {
    produtoId: string,
    tipo: TipoMovimentacao,
    quantidade: number;
    observacao: string;
}
export interface Movimentacao {
    id: string;
    tipoProduto: string     //  NOME do produto
    tipo: TipoMovimentacao;
    quantidade: number;
    data: string;         // data/hora em texto ISO
    observacao: string;
}