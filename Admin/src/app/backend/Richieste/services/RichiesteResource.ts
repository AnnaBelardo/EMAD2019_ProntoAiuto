import {Injectable} from '@angular/core';
import {Apiconfig} from '../../ApiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Richieste} from '../CRUD/DataModel/Richieste';

@Injectable({ providedIn: 'root' })
export class RichiesteResource {
  private readonly urlList = Apiconfig.url + '/richieste/list';
  constructor(private httpClient: HttpClient) {
  }
  public getAll(): Observable<Richieste[]> {
    return this.httpClient.get(this.urlList) as Observable<Richieste[]>;
  }
}
