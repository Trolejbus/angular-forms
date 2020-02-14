import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-boy',
  templateUrl: './boy.component.html',
  styleUrls: ['./boy.component.scss']
})
export class BoyComponent implements OnInit {

    @Input()
    public formGroup: FormGroup;

    constructor() { }

    ngOnInit() {
    }

}
