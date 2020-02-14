import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationType } from './enums/animation-type.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormController } from './controllers/form.controller';
import { BoyController } from './controllers/boy.controller';
import { GirlController } from './controllers/girl.controller';
import { CoupleController } from './controllers/couple.controller';
import { PeselValidator } from './validators/pesel.validator';
import { FormType } from './enums/form-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public submitFormGroup: FormGroup;
    public submitting: boolean = false;

    private controllers: FormController[] = [
        new BoyController(),
        new GirlController(),
        new CoupleController()
    ];

    /* FormControl
    FormGroup 
    FormArray */

    constructor() {
        this.buildFormGroup();
        
    }

    private buildFormGroup(): void {
        this.submitFormGroup = new FormGroup({
            'name': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
            'email': new FormControl(),
            'type': new FormControl()
        });
        this.initializeControllers();
        var item = localStorage.getItem('form');
        
        if(item != null) {
            let itemParsed = JSON.parse(item);
            this.submitFormGroup.patchValue(itemParsed);
        }
    }

    public test(): void {
        console.log(this.submitFormGroup);
    }

    public async submit(event: Event): Promise<void> {
        if(this.submitFormGroup.invalid){
            return;
        }

        this.submitting = true;
        this.submitFormGroup.disable();
        event.preventDefault();
        await this.save();
        this.submitFormGroup.enable();
        this.submitting = false;
    }

    public async save(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(this.submitFormGroup.value);
                localStorage.setItem('form', JSON.stringify(this.submitFormGroup.value));
                resolve();
            }, 2000);
        });
    }

    public clear(event: Event): void {
        event.preventDefault();
        this.submitFormGroup.reset();
        localStorage.removeItem('form');
    }

    private initializeControllers(): void {
        this.controllers.forEach(c => {
            c.initialize(this.submitFormGroup);
        })
    }

    //

    /* ==== */
/*
    public AnimationType = AnimationType;
    public animation = AnimationType.Editing;




    this.buildFormGroup();
        this.initializeControllers();
 

    public buildFormGroup(): void {
        this.formGroup = new FormGroup({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.email),
            'pesel': new FormControl('', PeselValidator.isValid()),
            'type': new FormControl(null)
        });
    }*/

    /* ==== */

    /*



    public test(): void {
        console.log(this.formGroup);
    }

    /*/
}
