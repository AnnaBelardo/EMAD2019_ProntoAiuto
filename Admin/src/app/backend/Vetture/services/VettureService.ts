import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Vetture} from '../CRUD/DataModel/Vetture';
import {VettureResource} from './VettureResource';
import {VetturePosizione} from '../CRUD/DataModel/VetturePosizione';

@Injectable({ providedIn: 'root' })
export class VettureService {

  constructor(private vettureResource: VettureResource) {
  }

  public getAllVetture(): Observable<Vetture[]> {
    return this.vettureResource.getAll();
  }

  public getAllVettureAndPosition(): Observable<VetturePosizione[]> {
    return this.vettureResource.getAllVettureAndPosition();
  }

  public createVettura(vetturaFormData: FormData): Observable<Vetture> {
    return this.vettureResource.create(vetturaFormData);
  }

  public deleteVettura(vetturaId: number): Observable<void> {
    return this.vettureResource.delete(vetturaId);
  }

  public updateVetturaPost(vetturaFormData: FormData, vetturaId: number): Observable<Vetture> {
    return this.vettureResource.updatePost(vetturaFormData, vetturaId);
  }

  public updateVetturaGet(vetturaId: number): Observable<Vetture> {
    return this.vettureResource.updateGet(vetturaId);
  }

  public getVettura(idRVettura: number): Observable<Vetture> {
    return this.vettureResource.getVettura(idRVettura);
  }
}
