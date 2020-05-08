import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
    public async validEmail(email: string): Promise<boolean> {
        console.log(email);
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(email != "existing@example.com");
            }, 2000);
        })
    }
}