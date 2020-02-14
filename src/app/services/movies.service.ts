import { Movie } from '../model/movie.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesService {
    public async getAll(): Promise<Movie[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: 'Nietykalni' },
                    { name: 'Kolejne romansidło' },
                    { name: 'Greglonia' },
                    { name: 'O kimś kto lubi brukselki' },
                ]);
            }, 2000);
        })
    }
}