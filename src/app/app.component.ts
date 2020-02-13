import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationType } from './enums/animation-type.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public AnimationType = AnimationType;
  public animation = AnimationType.Editing;
  public submitting: boolean = false;
  public formGroup: FormGroup;

  constructor() {
    this.buildFormGroup();
  }

  /* ==== */

  public buildFormGroup(): void {
    this.formGroup = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl()
    });
  }

  /* ==== */

  public async submit(event: Event): Promise<void> {
    this.submitting = true;
    this.formGroup.disable();
    event.preventDefault();
    this.animation = this.animation == AnimationType.EditWrong ? this.AnimationType.Editing : AnimationType.EditWrong;
    await this.save();
    this.formGroup.enable();
    this.submitting = false;
  }

  public async save(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(this.formGroup.value);
        resolve();
      }, 2000);
    })
  }
}
