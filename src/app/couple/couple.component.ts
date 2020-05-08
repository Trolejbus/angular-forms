import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ServiceType } from '../enums/serviceType.enum';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../model/movie.model';
import { CoupleController } from '../controllers/couple.controller';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss']
})
export class CoupleComponent implements OnInit {

    @Input()
    public formGroup: FormGroup;
    public ServiceType = ServiceType;

    constructor(public coupleController: CoupleController) {
        
    }

    ngOnInit() {
        
    }

    public getIcon(type: ServiceType): string {
        switch(type) {
            case ServiceType.Boat:
                return "boat.png";
            case ServiceType.Cinema:
                return "cinema.png";
            case ServiceType.Dinner:
                return "dinner.png";
            case ServiceType.Drinks:
                return "drinks.png";
            default:
                throw new Error(`Type ${type} is not mapped to any icon.`)
        }
    }
}
