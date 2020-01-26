import {Injectable} from '@angular/core';
import {Apiconfig} from '../../ApiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Vetture} from '../CRUD/DataModel/Vetture';

@Injectable({ providedIn: 'root' })
export class ValidatorsResource {
  private readonly urlCheckIdentify = Apiconfig.urlValidators + '/check-identify';
  constructor(private httpClient: HttpClient) {
  }
  public checkIfIdentificativoExists(identificativo: string): Observable<Vetture> {
    return this.httpClient.get(this.urlCheckIdentify + '/' + identificativo ) as Observable<Vetture>;
  }
}
