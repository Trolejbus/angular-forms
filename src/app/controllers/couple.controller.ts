import { FormController } from './form.controller';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormType } from '../enums/form-type.enum';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceType } from '../enums/serviceType.enum';
import { Movie } from '../model/movie.model';
import { MoviesService } from '../services/movies.service';
import { ServiceModel } from '../model/service.model';

@Injectable()
export class CoupleController extends FormController {
    private typeSubscription: Subscription;
    private formGroup: FormGroup;

    constructor(private movieService: MoviesService) {
        super();
    }

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

    public pathValue(submitFormGroup: FormGroup, itemParsed: any): void {
        if(itemParsed == null || itemParsed.couple == null) {
            return;
        }

        this.activate();
        for(let service of itemParsed.couple.services as ServiceModel []) {
            switch(service.type) {
                case ServiceType.Boat:
                    this.addBoat();
                    break;
                case ServiceType.Cinema:
                    this.addCinema();
                    break;
                case ServiceType.Dinner:
                    this.addDinner();
                    break;
                case ServiceType.Drinks:
                    this.addDrinks();
                    break;
            }
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

    private getBaseServiceFormGroup(serviceType: ServiceType): FormGroup {
        let serivcesArray = this.formGroup.get('couple.services') as FormArray;
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
        (this.formGroup.get('couple.services') as FormArray).push(formGroup);
    }

    public addBoat(): void {
        let serviceFormGroup = this.getBaseServiceFormGroup(ServiceType.Boat);
        this.addToService(serviceFormGroup);
    }

    public addCinema(): void {
        let serviceFormGroup = this.getBaseServiceFormGroup(ServiceType.Cinema);
        serviceFormGroup.addControl('movie', new FormControl());
        this.loadMovies();
        this.addToService(serviceFormGroup);
    }

    public addDinner(): void {
        let serviceFormGroup = this.getBaseServiceFormGroup(ServiceType.Dinner);
        this.addToService(serviceFormGroup);
    }

    public addDrinks(): void {
        let serviceFormGroup = this.getBaseServiceFormGroup(ServiceType.Drinks);
        this.addToService(serviceFormGroup);
    }

    public async loadMovies(): Promise<void> {
        this.movies = await this.movieService.getAll();
        this.moviesLoaded = true;
    }

    public moviesLoaded: boolean = false;
    public movies: Movie[];
}