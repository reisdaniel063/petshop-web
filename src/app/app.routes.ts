import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'fornecedores', pathMatch: 'full'},
    {
        path: 'fornecedores',
        loadComponent: () =>
            import('./pages/fornecedores/fornecedores').then(m => m.Fornecedores)
    }
];