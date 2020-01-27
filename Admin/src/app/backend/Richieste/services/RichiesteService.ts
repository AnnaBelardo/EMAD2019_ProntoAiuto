import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Richieste} from '../CRUD/DataModel/Richieste';
import {RichiesteResource} from './RichiesteResource';

@Injectable({ providedIn: 'root' })
export class RichiesteService {

  constructor(private vettureResource: RichiesteResource) {
  }

  public getAllRichieste(): Observable<Richieste[]> {
    return this.vettureResource.getAll();
  }
}
