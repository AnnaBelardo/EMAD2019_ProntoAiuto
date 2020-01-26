import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ValidatorsService} from '../../services/ValidatorsService';

@Injectable({ providedIn: 'root' })
export class UniqueIdentificativoValidator implements AsyncValidator {
  constructor(private validatorsService: ValidatorsService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validatorsService.isIdentificativoTaken(ctrl.value).pipe(
      map(response => (response ? { uniqueIdentificativo: true } : null)),
      catchError(() => null)
    );
  }
}

@Directive({
  selector: '[appUniqueIdentificativo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueIdentificativoValidator),
      multi: true
    }
  ]
})
export class UniqueIdentificativoValidatorDirective {
  constructor(private validator: UniqueIdentificativoValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
