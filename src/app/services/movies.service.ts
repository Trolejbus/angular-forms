import { Movie } from '../model/movie.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MoviesService {
    public async getAll(): Promise<Movie[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: 'Skazani na Sharepointa' },
                    { name: 'Nietestowalni' },
                    { name: 'SiiSiiland' },
                    { name: 'Lista Jsona' },
                    { name: 'Bug sam w DOMie' },
                    { name: 'Leon programista' },
                    { name: 'O kimś kto lubi brukselki' },
                ]);
            }, 2000);
        })
    }
}