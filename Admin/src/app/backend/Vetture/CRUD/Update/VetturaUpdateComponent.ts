import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

import { Injectable } from '@angular/core';
import {VettureService} from '../../services/VettureService';
import {Observable} from 'rxjs';
import {Vetture} from '../DataModel/Vetture';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-vetture-update-component',
  templateUrl: 'VetturaUpdate.html'
})

@Injectable({ providedIn: 'root' })
export class VetturaUpdateComponent implements OnInit {
  id;
  updateVetturaForm;
  public vetturaUpdate: Observable<Vetture>;
  tipoChoice = {'Autovettura': 'Autovettura', 'Motociclo': 'Motociclo', 'Corazzato': 'Corazzato', 'Elicottero': 'Elicottero',
    'Ambulanza': 'Ambulanza' };
  statoChoice = {'Operativa': 'Operativa', 'Non Operativa': 'Non Operativa'}

  constructor(private vettureService: VettureService, private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vettureService.updateVetturaGet(this.id).subscribe(response => {
      this.updateVetturaForm = this.formBuilder.group({
        identificativo: new FormControl({value: response.identificativo, disabled: true}, [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(4),
          ],
        ),
        tipologia: new FormControl(response.tipologia, [
          Validators.required,
        ]),
        stato: new FormControl(response.stato, [
          Validators.required,
        ]),
        imei: new FormControl(response.imei, [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(15),
        ]),
        playerId: new FormControl(response.playerId, [
          Validators.required,
          Validators.maxLength(36),
          Validators.minLength(36),
        ]),
      });
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
    this.vetturaUpdate = this.vettureService.updateVetturaPost(vetturaForm, this.id);
    this.vetturaUpdate.subscribe(
      (response) => this.redirect(),
      (error) => console.log(error));
  }
  get tipologia() { return this.updateVetturaForm.get('tipologia'); }
  get imei() { return this.updateVetturaForm.get('imei'); }
  get playerId() { return this.updateVetturaForm.get('playerId'); }
  get stato() { return this.updateVetturaForm.get('stato'); }

  redirect() {
    this.router.navigate(['vetture/list']);
  }

}
