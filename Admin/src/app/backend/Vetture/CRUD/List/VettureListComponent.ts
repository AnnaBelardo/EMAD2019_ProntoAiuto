import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {VettureService} from '../../services/VettureService';
import {Observable} from 'rxjs';
import {Vetture} from '../DataModel/Vetture';
import {Router} from '@angular/router';


@Component({
  selector: 'app-vetture-list-component',
  templateUrl: 'VettureList.html'
})

@Injectable({ providedIn: 'root' })
export class VettureListComponent implements OnInit {
  public vettureList: Observable<Vetture[]>;
  constructor(private http: HttpClient, private vettureService: VettureService, private router: Router) {
  }
  ngOnInit() {
    this.vettureList = this.vettureService.getAllVetture();
  }

  public deleteVettura(vettura: Vetture) {
    this.vettureService.deleteVettura(vettura.id).subscribe(response => {
      console.log('Response: ' + response);
      this.redirect();
    });
  }

  redirect() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['vetture/list']);
    });
  }

  // script per inviare una notifica all'app
  notificaPush() {
    const body = JSON.stringify({
      'app_id': 'a25229e0-e3d2-419c-8706-8c0abbe60353',
      'included_segments': ['Active Users'],
      'headings': {'en': 'Titolo'},
      'contents': {'en': 'Contenuto'},
      'data': {'task': 'Sent through API'}
    });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Basic ZDBmMTAyZjItODg1Zi00NTVlLWFjMWItOTkyY2E3YTZkOTkw'});
    return this.http.post('https://onesignal.com/api/v1/notifications', body, {headers}).subscribe(data => {
      console.log(data);
    })
  }
}
