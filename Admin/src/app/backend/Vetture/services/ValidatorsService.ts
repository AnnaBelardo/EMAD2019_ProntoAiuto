import {Injectable, NgZone} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Vetture} from '../CRUD/DataModel/Vetture';
import {ValidatorsResource} from './ValidatorsResource';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  constructor(private validatorsResource: ValidatorsResource) {
  }
  public isIdentificativoTaken(identificativo: string): Observable<Vetture> {
    return this.validatorsResource.checkIfIdentificativoExists(identificativo);
  }
}
