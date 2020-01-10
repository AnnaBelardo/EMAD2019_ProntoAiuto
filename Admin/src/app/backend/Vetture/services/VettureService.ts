import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Vetture} from './Vetture';
import {VettureResource} from './VettureResource';

@Injectable()
export class VettureService {

  constructor(private vettureResource: VettureResource) {
  }

  public getAllVetture(): Observable<Vetture[]> {
    return this.vettureResource.getAll();
  }
}
