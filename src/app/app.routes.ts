import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/dashboard/dashboard').then(m => m.Dashboard)
    },
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
    },
    {
        path: 'ordem-de-compra',
        loadComponent: () =>
            import('./pages/ordem-de-compra/ordem-de-compra').then(m => m.OrdemDeCompra)
    }
];