import { FormGroup } from '@angular/forms';

export abstract class FormController {
    public activated: boolean;

    public initialize(formGroup: FormGroup): void {

    }

    public uninitialize(formGroup: FormGroup): void {
        
    }

    protected activate(): void {
        if(this.activated) {
            return;
        }
        this.activated = true;
        this.activateInternal();
    }
        
    protected deactivate(): void {
        if(!this.activated) {
            return;
        }
        this.activated = false;
        this.deactivateInternal();
    }
    
    protected deactivateInternal(): void {

    }

    protected activateInternal(): void {

    }
}