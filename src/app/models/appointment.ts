import { PatientsService } from "../services/patients.services";
import { AppointmentType } from "./appointmentType";
import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class Appointment {
    appointmentTypeId: number;
    type: AppointmentType;
    doctor: Doctor;
    patient: Patient;
    key: string;
    id: number;


    constructor( public doctorId: number, public patientId: number, public reservation: string ) {

        

     }

}
