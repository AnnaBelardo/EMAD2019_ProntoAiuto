import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Injectable } from '@angular/core';
import { RichiesteService} from '../../services/RichiesteService';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import tt from '@tomtom-international/web-sdk-maps';
import {Apiconfig} from '../../../ApiConfig';


@Component({
  selector: 'app-richiesta-details-component',
  templateUrl: 'RichiestaDetails.html',
  styleUrls: ['RichiestaDetails.component.css'],
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
  public latitudine: string;
  public longitudine: string;
  public tipologia: string;
  public informazioni: string;
  public stato: string;
  public forzaOrdine: string;
  public idVettura: string;
  public vetturaIdDettaglio: number;
  public imeiVettura: string;
  public lineaVerde: string;
  public supporto: string;
  public tempoArrivo: number;
  public foto_yes: boolean;
  public selfie_yes: boolean;
  public audio_yes: boolean;

  constructor(private richiesteService: RichiesteService, private router: Router,
              private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.foto_yes = true;
    this.selfie_yes = true;
    this.audio_yes = true;
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.richiesteService.getRichiesta(this.id).subscribe((richiesta) => {
        if (richiesta.audio === null) {
          this.audio_yes = false;
        }
        if (richiesta.selfie === null) {
          this.selfie_yes = false;
        }
        if (richiesta.foto === null) {
          this.foto_yes = false;
        }
        this.imei = richiesta.imei;
        this.latitudine = richiesta.lat;
        this.longitudine = richiesta.long;
        this.tipologia = richiesta.tipologia;
        this.informazioni = richiesta.informazioni;
        this.stato = richiesta.stato;
        this.forzaOrdine = richiesta.forza_ordine;
        this.idVettura = richiesta.vettura;
        this.imeiVettura = richiesta.vettura_imei;
        this.lineaVerde = this.formattabooleano(String(richiesta.linea_verde_richiesta));
        this.supporto = richiesta.is_supporto;
        this.tempoArrivo = richiesta.tempoDiArrivo;
        this.selfie = Apiconfig.urlMedia + richiesta.selfie;
        this.audio = Apiconfig.urlMedia + richiesta.audio;
        this.vetturaIdDettaglio = richiesta.vetturaIdDettaglio;
        // this.audioOgg = Apiconfig.urlMedia + (richiesta.audio.replace('.mp3', '.ogg'));
        this.foto = Apiconfig.urlMedia + richiesta.foto;
        if (this.audio_yes) {
          document.getElementById('cardBodyAudio').insertAdjacentHTML('afterbegin', '<audio controls>\n' +
            '<source  src="' + this.audio + '" type="audio/mpeg">\n' +
            '</audio>');
        }
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

  formattabooleano(value: string): string {
    if (value.toLowerCase() === 'false') {
      return 'No';
    } else {
      return 'Si';
    }
  }
}
