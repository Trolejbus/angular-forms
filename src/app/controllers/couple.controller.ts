import { FormController } from './form.controller';
import { FormGroup, FormArray } from '@angular/forms';
import { FormType } from '../enums/form-type.enum';
import { Subscription } from 'rxjs';

export class CoupleController extends FormController {
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
        if(value == FormType.Couple){
            this.activate();
        }
        else {
            this.deactivate();
        }
    }

    protected activateInternal(): void {
        this.formGroup.addControl('couple', new FormGroup({
            'services': new FormArray([])
        }));
    }
    
    protected deactivateInternal(): void {
        this.formGroup.removeControl('couple');
    }
}