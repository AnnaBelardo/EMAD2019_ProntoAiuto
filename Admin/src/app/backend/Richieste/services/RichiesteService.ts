import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Richieste} from '../CRUD/DataModel/Richieste';
import {RichiesteResource} from './RichiesteResource';

@Injectable({ providedIn: 'root' })
export class RichiesteService {

  constructor(private richiesteResource: RichiesteResource) {
  }

  public getAllRichieste(): Observable<Richieste[]> {
    return this.richiesteResource.getAll();
  }

  public getRichiesta(idRichiesta: number): Observable<Richieste> {
    return this.richiesteResource.getRichiesta(idRichiesta);
  }
}
