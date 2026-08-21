import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrdemDeCompra, GerarOrdemDeCompra } from '../models/ordem-de-compra-model';

@Injectable({ providedIn: 'root' })
export class OrdemDeCompraApi {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/OrdemDeCompra`;

  gerar(dto: GerarOrdemDeCompra): Observable<OrdemDeCompra> {
    return this.http.post<OrdemDeCompra>(`${this.url}/gerar`, dto);
  }

  buscarPorId(id: string): Observable<OrdemDeCompra> {
    return this.http.get<OrdemDeCompra>(`${this.url}/${id}`);
  }
}