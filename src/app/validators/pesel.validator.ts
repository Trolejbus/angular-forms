import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export class PeselValidator {
    public static isValid(): ValidatorFn {
        return (c: AbstractControl): ValidationErrors | null => {
            const pesel: string = c.value;
            if (this.isEmpty(pesel)) {
                return null;
            }
            if (pesel.length !== 11) {
                return{ 'invalid-pesel-length': true };
            }
            if (!this.isNumber(pesel)) {
                return{ 'invalid-chars': true };
            }
            if (!this.isIntegrityValid(pesel)) {
                return{ 'invalid-integrity': true };
            }
            return null;
        };
    }

    public static isModelValid(birthDateField: string, peselField: string): ValidatorFn {
        return (c: AbstractControl): ValidationErrors | null => {
            const peselControl = c.get(peselField);
            const birthControl = c.get(birthDateField);
            if (peselControl == null) {
                throw new Error(`Control with name '${peselField}' not found`);
            }
            if (birthControl == null) {
                throw new Error(`Control with name '${birthDateField}' not found`);
            }
            const peselValue = peselControl.value;
            const birthValue = birthControl.value;
            if (this.isEmpty(peselValue) || birthValue == null) {
                return null;
            }
            if (peselControl.invalid || birthControl.invalid) {
                return null;
            }
            if (!this.isPeselWithBirthDateValid(peselValue, birthValue)) {
                return { 'invalid-birthDate-pesel-connection': true };
            }
            return null;
        };
    }

    public static isPeselWithBirthDateValid(peselValue: string, birthValue: Date) {
        const year =  Number(peselValue[0] + peselValue[1]);
        const month =  Number(peselValue[2] + peselValue[3]);
        const day =  Number(peselValue[4] + peselValue[5]);
        let realYear = 0;
        let realMonth = 0;
        switch (Number(peselValue[2]))
        {
            case 0:
            case 1:
                realYear = 1900 + year;
                realMonth = month;
                break;
            case 2:
            case 3:
                realYear = 2000 + year;
                realMonth = month - 20;
                break;
            case 4:
            case 5:
                realYear = 2100 + year;
                realMonth = month - 40;
                break;
            case 6:
            case 7:
                realYear = 2200 + year;
                realMonth = month - 60;
                break;
            default:
                return false;
        }

        return day === birthValue.getDate() &&
            realMonth - 1 === birthValue.getMonth() &&
            realYear === birthValue.getFullYear();
    }

    private static isEmpty(value: string): boolean {
        return value == null || value === '';
    }

    private static isIntegrityValid(pesel: string): boolean {
        const peselWeight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let validationSum = 0;
        for (let index = 0; index < (pesel.length - 1); index++) {
            const multiplyResult = Number(pesel[index]) * peselWeight[index];
            validationSum += this.getLastDigit(multiplyResult);
        }
        const checkSum = this.getLastDigit(10 - this.getLastDigit(validationSum));
        return Number(pesel[10]) === checkSum;
    }

    private static isNumber(value: string | number): boolean {
        return ((value != null) &&
            (value !== '') &&
            !isNaN(Number(value.toString())));
    }

    private static getLastDigit(value: number): number {
        return value % 10;
    }
}
