import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Injectable } from '@angular/core';
import { RichiesteService} from '../../services/RichiesteService';
import {Observable} from 'rxjs';
import { Richieste} from '../DataModel/Richieste';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import tt from '@tomtom-international/web-sdk-maps';
import {Apiconfig} from '../../../ApiConfig';


@Component({
  selector: 'app-richiesta-details-component',
  templateUrl: 'RichiestaDetails.html',
  styleUrls: ['Richiesta.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable({ providedIn: 'root' })
export class RichiestaDetailsComponent implements OnInit {
  private map: any;
  id;
  public selfie: string;
  public imei: string;
  public foto: string;
  public audio: string;
  public audioOgg: string;
  public latitudine: string;
  public longitudine: string;
  public tipologia: string;
  public informazioni: string;
  public stato: string;
  public forzaOrdine: string;
  public idVettura: string;
  public imeiVettura: string;
  public lineaVerde: boolean;
  public supporto: string;
  public tempoArrivo: number;

  constructor(private richiesteService: RichiesteService, private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.richiesteService.getRichiesta(this.id).subscribe((richiesta) => {
        this.imei = richiesta.imei;
        this.latitudine = richiesta.lat;
        this.longitudine = richiesta.long;
        this.tipologia = richiesta.tipologia;
        this.informazioni = richiesta.informazioni;
        this.stato = richiesta.stato;
        this.forzaOrdine = richiesta.forza_ordine;
        this.idVettura = richiesta.vettura;
        this.imeiVettura = richiesta.vettura_imei;
        this.lineaVerde = richiesta.linea_verde_richiesta;
        this.supporto = richiesta.is_supporto;
        this.tempoArrivo = richiesta.tempoDiArrivo;
        this.selfie = Apiconfig.urlMedia + richiesta.selfie;
        this.audio = Apiconfig.urlMedia + richiesta.audio;
        // this.audioOgg = Apiconfig.urlMedia + (richiesta.audio.replace('.mp3', '.ogg'));
        this.foto = Apiconfig.urlMedia + richiesta.foto;
        document.getElementById('cardBodyAudio').insertAdjacentHTML('afterbegin', '<audio controls>\n' +
          '<source  src="' + this.audio + '" type="audio/mpeg">\n' +
          '</audio>');
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
    this.router.navigate(['richieste/list']);
  }

  tempoStimatoFormattato(): string {
    return (Math.round(((this.tempoArrivo / 60) + Number.EPSILON) * 100) / 100).toString();
  }

}
