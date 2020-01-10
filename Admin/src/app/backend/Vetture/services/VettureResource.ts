import {Injectable} from '@angular/core';
import {Apiconfig} from '../../ApiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vetture} from './Vetture';

@Injectable()
export class VettureResource {
  private readonly URL = Apiconfig.url + '/vetture/list';
  constructor(private httpClient: HttpClient) {
  }
  public getAll(): Observable<Vetture[]> {
    return this.httpClient.get(this.URL) as Observable<Vetture[]>;
  }
}
