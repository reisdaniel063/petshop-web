import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto, CriarProduto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/Produto`;

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  criar(dto: CriarProduto): Observable<Produto> {
    return this.http.post<Produto>(this.url, dto);
  }
}