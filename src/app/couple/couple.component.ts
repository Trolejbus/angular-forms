import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ServiceType } from '../enums/serviceType.enum';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss']
})
export class CoupleComponent implements OnInit {

    public cities1 = [
        {label:'Select City', value:null},
        {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
        {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
        {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
        {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
        {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
    ];

    @Input()
    public formGroup: FormGroup;
    public ServiceType = ServiceType;
    public moviesLoaded: boolean;
    public movies: Promise<Movie[]>;

    constructor(private movieService: MoviesService) { }

    ngOnInit() {
        console.log(this.formGroup);
    }

    public addBoat(): void {
        let formGroup = this.getBaseServiceFormGroup(ServiceType.Boat);
        this.addToService(formGroup);
    }

    public addCinema(): void {
        let formGroup = this.getBaseServiceFormGroup(ServiceType.Cinema);
        this.loadMovies();
        this.addToService(formGroup);
    }

    public loadMovies(): void {
        this.movies = this.movieService.getAll();
        this.moviesLoaded = true;
    }

    public addDinner(): void {
        let formGroup = this.getBaseServiceFormGroup(ServiceType.Dinner);
        this.addToService(formGroup);
    }

    public addDrinks(): void {
        let formGroup = this.getBaseServiceFormGroup(ServiceType.Drinks);
        this.addToService(formGroup);
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

    private getBaseServiceFormGroup(serviceType: ServiceType): FormGroup {
        let serivcesArray = this.formGroup.get('services') as FormArray;
        let getPreviousTime = serivcesArray.length > 0 ?
            serivcesArray.at(serivcesArray.length - 1).get('to').value :
            16;
        return new FormGroup({
            'type': new FormControl(serviceType),
            'from': new FormControl(getPreviousTime),
            'to': new FormControl(getPreviousTime + 1)
        });
    }

    private addToService(formGroup: FormGroup): void {
        (this.formGroup.get('services') as FormArray).push(formGroup);
    }
}
