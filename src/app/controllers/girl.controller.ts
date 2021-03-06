import { FormController } from './form.controller';
import { FormGroup } from '@angular/forms';
import { FormType } from '../enums/form-type.enum';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GirlController extends FormController {
    private typeSubscription: Subscription;
    private formGroup: FormGroup;

    public initialize(formGroup: FormGroup): void {
        this.formGroup = formGroup;
        this.typeSubscription = formGroup.get('type').valueChanges
            .subscribe((type) => { this.onTypeChanged(type); });
    }

    public uninitialize(): void {
        this.typeSubscription.unsubscribe();
    }

    public onTypeChanged(value: FormType): void {
        if(value == FormType.Girl){
            this.activate();
        }
        else {
            this.deactivate();
        }
    }

    protected activateInternal(): void {
        this.formGroup.addControl('girl', new FormGroup({

        }));
    }
    
    protected deactivateInternal(): void {
        this.formGroup.removeControl('girl');
    }
}