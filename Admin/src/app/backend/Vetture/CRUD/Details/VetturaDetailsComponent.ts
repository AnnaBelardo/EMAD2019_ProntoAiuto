import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import tt from '@tomtom-international/web-sdk-maps';
import {VettureService} from '../../services/VettureService';


@Component({
  selector: 'app-vettura-details-component',
  templateUrl: 'VetturaDetails.html',
  styleUrls: ['VetturaDetails.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable({ providedIn: 'root' })
export class VetturaDetailsComponent implements OnInit {
  private map: any;
  id;
  public imei: string;
  public identificativo: string;
  public latitudine: string;
  public longitudine: string;
  public tipologia: string;
  public forzaOrdine: string;
  public stato: string;
  public disponibile: string;
  public richiesta: number;
  public agg_pos: string;

  constructor(private vettureService: VettureService, private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vettureService.getVettura(this.id).subscribe((vettura) => {
        this.imei = vettura.imei;
        this.identificativo = vettura.identificativo;
        this.latitudine = vettura.latitudine;
        this.longitudine = vettura.longitudine;
        this.tipologia = vettura.tipologia;
        this.forzaOrdine = vettura.forza_ordine;
        this.stato = vettura.stato;
        this.disponibile = this.formattabooleano(String(vettura.disponibile));
        this.richiesta = vettura.richiesta;
        this.agg_pos = vettura.agg_pos;
        this.map = tt.map({
          key: 'pBDtSNH15AVCe1kLOKb1lgvdgWtGCHaG',
          container: 'map',
          style: 'tomtom://vector/1/basic-main',
          center: [this.longitudine, this.latitudine],
          zoom: 12,
        });
        this.map.setLanguage('it-IT');
        this.map.addControl(new tt.NavigationControl());
        const marker = new tt.Marker()
          .setLngLat([this.longitudine, this.latitudine])
          .addTo(this.map);
      }
    );
  }

  redirect() {
    this.router.navigate(['vetture/list']);
  }

  stringoToDate(s: string) {
    const data = new Date(s);
    return data.toDateString() + ' - ' + data.getHours() + ':' + data.getMinutes();
  }

  formattabooleano(value: string): string {
    if (value.toLowerCase() === 'false') {
      return 'No';
    } else {
      return 'Si';
    }
  }
}
