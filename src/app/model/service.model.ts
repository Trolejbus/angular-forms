import { ServiceType } from '../enums/serviceType.enum';

export class ServiceModel {
    public from: number;
    public to: number;
    public icon: string;
    public type: ServiceType;
}