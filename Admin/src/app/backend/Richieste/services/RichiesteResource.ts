import {Injectable} from '@angular/core';
import {Apiconfig} from '../../ApiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Richieste} from '../CRUD/DataModel/Richieste';

@Injectable({ providedIn: 'root' })
export class RichiesteResource {
  private readonly urlList = Apiconfig.url + '/richiesta/list';
  private readonly urlRichiesta = Apiconfig.url + '/richiesta/get/richiesta/detail/';
  constructor(private httpClient: HttpClient) {
  }
  public getAll(): Observable<Richieste[]> {
    return this.httpClient.get(this.urlList) as Observable<Richieste[]>;
  }
  public getRichiesta(richiestaId: number): Observable<Richieste> {
    return this.httpClient.get(this.urlRichiesta + richiestaId + '/') as Observable<Richieste>;
  }
}
