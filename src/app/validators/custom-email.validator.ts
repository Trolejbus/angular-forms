import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { Observable, timer, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CustomEmailValidator {
    constructor(private emailService: EmailService){

    }

    public existingEmailValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            let debounceTime = 500; //milliseconds
            return timer(debounceTime).pipe(switchMap(()=> {
                return from(this.emailService.validEmail(control.value)).pipe(map(
                    isValid => {
                        return isValid ? null : {"emailExists": true};
                    }
                ));
            }));
        }
    } 

}