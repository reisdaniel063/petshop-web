import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movimentacao, CriarMovimentacao } from '../models/movimentacao.model';

@Injectable({ providedIn: 'root' })
export class MovimentacaoApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/Movimentacao`;

  registrar(dto: CriarMovimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(this.url, dto);
  }

  listarPorProduto(produtoId: string, de: string, ate: string): Observable<Movimentacao[]> {
    const params = new HttpParams().set('de', de).set('ate', ate);
    return this.http.get<Movimentacao[]>(`${this.url}/${produtoId}`, { params });
  }
}