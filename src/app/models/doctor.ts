import { Specialization } from "./specialization";

export class Doctor {

    email: string;
    iban: string;
    country: string;
    appointments: string;
    specialization: Specialization;
    doctorName: string;
    address:string;
    notes: string;
    phoneNumber: string;
    key:string;
    specializationId: number;
    id: number;

    constructor( public firstName: string, public lastName: string, public monthlySalary: number
       ) { }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
