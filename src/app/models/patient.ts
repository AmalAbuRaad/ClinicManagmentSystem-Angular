export class Patient {
    key:string;
    email: string;
    gender: string;
    phoneNumber: string;
    ssn: string;
    address: string;
    country: string;
    public id: number;

    constructor( public firstName: string, public lastName: string, public age: number) { }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
