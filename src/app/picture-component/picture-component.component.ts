import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormType } from '../enums/form-type.enum';

@Component({
    selector: 'app-picture-component',
    templateUrl: './picture-component.component.html',
    styleUrls: ['./picture-component.component.scss'],
    providers: [     
        {       
            provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => PictureComponentComponent),
            multi: true     
        }
    ]
})
export class PictureComponentComponent implements OnInit, ControlValueAccessor {
    public FormType = FormType;
    public value: FormType;
    public disabled: boolean;
    private changeFn: (value: FormType) => void;
    private touchedFn: () => void;

    public getStyles(form: FormType): any {
        return {
            'selected': this.value == form,
            'disabled': this.disabled,
            'not-selected': this.value != null && this.value != form
        }    
    }

    constructor() { }

    ngOnInit() {
    }

    public writeValue(obj: FormType): void {
        this.value = obj;
    }

    public select(newValue: FormType): void {
        if(this.disabled) {
            return;
        }

        this.value = newValue;
        if(this.changeFn != null){
            this.changeFn(this.value);
        }
        if(this.touchedFn != null){
            this.touchedFn();
        }
    }

    public registerOnChange(fn: any): void {
        this.changeFn = fn;
    }

    public registerOnTouched(fn: any): void {
        this.touchedFn = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
