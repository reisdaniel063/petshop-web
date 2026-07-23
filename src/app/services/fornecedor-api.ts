import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Fornecedor, CriarFornecedor } from '../models/fornecedor.model';

@Injectable({ providedIn: 'root' })
export class FornecedorApi {
    private readonly http = inject(HttpClient);
    private readonly url = `${environment.apiUrl}/Fornecedor`;
        
    listar():Observable<Fornecedor[]> {
        return this.http.get<Fornecedor[]>(this.url);
    }

    buscarPorId(id: string): Observable<Fornecedor> {
        return this.http.get<Fornecedor>(`${this.url}/${id}`);
    }
    criar(dto: CriarFornecedor): Observable<Fornecedor> { 
        return this.http.post<Fornecedor>(this.url, dto)
    }
}