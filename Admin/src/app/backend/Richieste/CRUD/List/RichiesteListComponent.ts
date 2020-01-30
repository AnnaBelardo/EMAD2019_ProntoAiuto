import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RichiesteService} from '../../services/RichiesteService';
import {Observable} from 'rxjs';
import {Richieste} from '../DataModel/Richieste';
import {Router} from '@angular/router';


@Component({
  selector: 'app-vetture-list-component',
  templateUrl: 'RichiesteList.html'
})

@Injectable({ providedIn: 'root' })
export class RichiesteListComponent implements OnInit {
  public richiesteList: Observable<Richieste[]>;
  constructor(private http: HttpClient, private richiesteService: RichiesteService, private router: Router) {
  }
  ngOnInit() {
    this.richiesteList = this.richiesteService.getAllRichieste();
  }

  redirect() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['richieste/list']);
    });
  }

  stringoToDate(s: string) {
    const data = new Date(s)
    return data.toDateString() + ' - ' + data.getHours() + ':' + data.getMinutes();
  }
}
