import {Injectable} from '@angular/core';
import {Apiconfig} from '../../ApiConfig';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Vetture} from '../CRUD/DataModel/Vetture';
import {VetturePosizione} from '../CRUD/DataModel/VetturePosizione';

@Injectable({ providedIn: 'root' })
export class VettureResource {
  private readonly urlList = Apiconfig.url + '/vetture/list';
  private readonly urlListVetturePoszioni = Apiconfig.url + '/vetture/list-vetture-position';
  private readonly urlCreate = Apiconfig.url + '/vetture/create/';
  private readonly urlDelete = Apiconfig.url + '/vetture/delete';
  private readonly urlUpdate = Apiconfig.url + '/vetture/update';
  constructor(private httpClient: HttpClient) {
  }
  public getAll(): Observable<Vetture[]> {
    return this.httpClient.get(this.urlList) as Observable<Vetture[]>;
  }
  public getAllVettureAndPosition(): Observable<VetturePosizione[]> {
    return this.httpClient.get(this.urlListVetturePoszioni) as Observable<VetturePosizione[]>;
  }
  public create(vetturaFormData: FormData): Observable<Vetture> {
    return this.httpClient.post(this.urlCreate, vetturaFormData) as Observable<Vetture>;
  }
  public delete(vetturaId: number): Observable<any> {
    return this.httpClient.delete(this.urlDelete + '/' + vetturaId);
  }
  public updateGet(vetturaId: number): Observable<Vetture> {
    return this.httpClient.get(this.urlUpdate + '/' + vetturaId) as Observable<Vetture>;
  }
  public updatePost(vetturaFormData: FormData, vetturaId: number): Observable<Vetture> {
    return this.httpClient.post(this.urlUpdate + '/' + vetturaId + '/', vetturaFormData) as Observable<Vetture>;
  }
}
