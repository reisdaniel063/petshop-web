import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'fornecedores', pathMatch: 'full' },
    {
        path: 'fornecedores',
        loadComponent: () =>
            import('./pages/fornecedores/fornecedores').then(m => m.Fornecedores)
    },
    {
        path: 'produtos',
        loadComponent: () =>
            import('./pages/produtos/produtos').then(m => m.Produtos)
    },
    {
        path: 'movimentacoes',
        loadComponent: () =>
            import('./pages/movimentacoes/movimentacoes').then(m => m.Movimentacoes)
    }
];