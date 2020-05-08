import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormController } from './controllers/form.controller';
import { BoyController } from './controllers/boy.controller';
import { GirlController } from './controllers/girl.controller';
import { CoupleController } from './controllers/couple.controller';
import { PeselValidator } from './validators/pesel.validator';
import { CustomEmailValidator } from './validators/custom-email.validator';
import { DatePipe } from '@angular/common';
import { CopyController } from './controllers/copy.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public submitFormGroup: FormGroup;
    public submitting: boolean = false;

    private controllers: FormController[] = [
        this.boyController,
        this.girlController,
        this.coupleController,
        new CopyController("from", "to"),
        new CopyController(
            "pesel",
            "birthdate",
            (value) => this.getBirthDateFromPesel(value),
            (value, source, target) => source.valid),
    ];

    /* FormControl
    FormGroup 
    FormArray */

    constructor(private emailValidator: CustomEmailValidator,
        private datePipe: DatePipe,
        private coupleController: CoupleController,
        private boyController: BoyController,
        private girlController: GirlController) {

        this.buildFormGroup();
        
    }

    private buildFormGroup(): void {
        this.submitFormGroup = new FormGroup({
            'name': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
            'email': new FormControl('', Validators.compose([Validators.required, Validators.email]), this.emailValidator.existingEmailValidator()),
            'pesel': new FormControl('', Validators.compose([PeselValidator.isValid(), Validators.required])),
            'birthdate': new FormControl(null, Validators.required),
            'type': new FormControl(),
            'from': new FormControl(),
            'to': new FormControl(),
        }, PeselValidator.isModelValid('birthdate', 'pesel'));
        this.initializeControllers();
        var item = localStorage.getItem('form');
        if(item != null) {
            let itemParsed = JSON.parse(item);
            itemParsed.birthdate = new Date(itemParsed.birthdate);
            this.patchValueToControllers(itemParsed);

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
                let savedValue = this.submitFormGroup.value;
                savedValue.birthdate = this.datePipe.transform(savedValue.birthdate, 'yyyy-MM-dd');
                console.log(this.submitFormGroup.value);
                localStorage.setItem('form', JSON.stringify(this.submitFormGroup.value));
                resolve();
            }, 2000);
        });
    }

    public clear(event: Event): void {
        event.preventDefault();
        console.log(this.submitFormGroup)
        this.submitFormGroup.reset(true);
        localStorage.removeItem('form');
    }

    public getEmailIcon(): string {
        return this.submitFormGroup.get("email").pending ? 
            "pi-spin pi-spinner" :
            (this.submitFormGroup.get("email").valid ?
                "pi-check-circle valid" :
                (this.submitFormGroup.get("email").touched ?
                    "pi-times-circle error" :
                    "pi-question-circle"));
    }

    private initializeControllers(): void {
        this.controllers.forEach(c => {
            c.initialize(this.submitFormGroup);
        })
    }

    private patchValueToControllers(itemParsed: any): void {
        this.controllers.forEach(c => {
            c.pathValue(this.submitFormGroup, itemParsed);
        })
    }

    private getBirthDateFromPesel(value: any): any {
        return new Date(`19${value[0]}${value[1]}/${value[2]}${value[3]}/${value[4]}${value[5]}`);
    }


    //

    /* ==== */
/*
    public AnimationType = AnimationType;
    public animation = AnimationType.Editing;




    this.buildFormGroup();
        
 

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
