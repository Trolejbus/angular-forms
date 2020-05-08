import { FormController } from './form.controller';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export class CopyController extends FormController {
    public enabled: boolean = true;
    private copySubscription: Subscription;

    constructor(private from: string,
        private to: string,
        private transformFn?: (value: any) => any,
        private copyConditionFn?: (value: any, sourceControl?: AbstractControl, targetControl?: AbstractControl) => boolean) {

        super();
    }

    public initialize(formGroup: FormGroup): void {
        let sourceControl = formGroup.get(this.from);
        let targetControl = formGroup.get(this.to);
        if(sourceControl == null) {
            throw new Error(`Source Control with name ${sourceControl} was not found in FormGroup.`);
        }

        if(targetControl == null) {
            throw new Error(`Source Control with name ${targetControl} was not found in FormGroup.`);
        }

        this.copySubscription = sourceControl.valueChanges.subscribe(v => this.copy(v, sourceControl, targetControl));
    }

    public uninitialize(formGroup: FormGroup): void {
        this.copySubscription.unsubscribe();
    }

    private copy(v: any, sourceControl: AbstractControl, targetControl: AbstractControl): void {
        let valueToCopy = v;
        console.log(this.copyConditionFn(v, sourceControl, targetControl))
        if(this.copyConditionFn != null &&
            !this.copyConditionFn(v, sourceControl, targetControl)) {
            
            return;
        }

        if(this.transformFn != null) {
            valueToCopy = this.transformFn(v);
        }

        targetControl.setValue(valueToCopy);
    }

}
