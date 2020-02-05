import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {VettureService} from '../../services/VettureService';
import {Observable} from 'rxjs';
import {Vetture} from '../DataModel/Vetture';
import {Router} from '@angular/router';
import {UniqueIdentificativoValidator} from '../Directives/identificativo.directive';


@Component({
  selector: 'app-vetture-create-component',
  templateUrl: 'VettureCreate.html'
})

@Injectable({ providedIn: 'root' })
export class VettureCreateComponent implements OnInit {
  createVetturaForm;
  public vetturaNew: Observable<Vetture>;
  tipoChoice = {'Autovettura': 'Autovettura', 'Motociclo': 'Motociclo',
    'Ambulanza': 'Ambulanza', 'Autocarro': 'Autocarro' };
  statoChoice = {'Operativa': 'Operativa', 'Non Operativa': 'Non Operativa'};
  foChoiche = { 'Polizia': 'Polizia', 'Carabinieri': 'Carabinieri', 'Paramedici': 'Paramedici', 'Pompieri': 'Pompieri'}
  constructor(private vettureService: VettureService, private formBuilder: FormBuilder, private router: Router,
              private identificativoValidator: UniqueIdentificativoValidator) {
  }
  ngOnInit() {
    this.createVetturaForm = this.formBuilder.group({
      identificativo: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4),
      ], [this.identificativoValidator.validate.bind(this.identificativoValidator)],
      ),
      tipologia: new FormControl('', [
        Validators.required,
      ]),
      forza_ordine: new FormControl('', [
        Validators.required,
      ]),
      stato: new FormControl('', [
        Validators.required,
      ]),
      imei: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(15),
      ]),
      playerId: new FormControl('', [
        Validators.required,
        Validators.maxLength(36),
        Validators.minLength(36),
      ]),
    });
  }
  onSubmit(vetturaData) {
    // Process checkout data here
    const vetturaForm = new FormData();
    for (const key in vetturaData ) {
      if (vetturaData.hasOwnProperty(key)) {
        vetturaForm.append(key, vetturaData[key]);
      }
    }
    this.vetturaNew = this.vettureService.createVettura(vetturaForm);
    this.vetturaNew.subscribe(
      (response) => this.redirect(),
      (error) => console.log(error));
  }
  get identificativo() { return this.createVetturaForm.get('identificativo'); }
  get tipologia() { return this.createVetturaForm.get('tipologia'); }
  get imei() { return this.createVetturaForm.get('imei'); }
  get playerId() { return this.createVetturaForm.get('playerId'); }
  get stato() { return this.createVetturaForm.get('stato'); }
  get forza_ordine() { return this.createVetturaForm.get('forza_ordine'); }

  redirect() {
    this.router.navigate(['vetture/list']);
  }

}
