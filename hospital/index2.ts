abstract class Person {
    firstName: string;
    lastName: string;
    age: number;
    address: string;

    constructor(firstName: string, lastName: string, age: number, address: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }

    abstract getFullDetails(): string;
}

class Patient extends Person {
    PatientID: number;
    phoneNumber: number;
    emergencyContact: number;
    medicalHistory: Appointment[];

    constructor(firstName: string, lastName: string, age: number, address: string, PatientID: number, phoneNumber: number, emergencyContact: number, medicalHistory: Appointment[] = []) {
        super(firstName, lastName, age, address);
        this.PatientID = PatientID;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }

    getFullDetails(): string {
        return `${this.firstName} ${this.lastName} ${this.age} ${this.address}`;
    }

    patientDetails(): void {
        console.log(`Patient: ID: ${this.PatientID} NAME: ${this.firstName} ${this.lastName} Age: ${this.age} Address: ${this.address}`);
    }

    addAppointmentToMedicalHistory(appointment: Appointment): void {
        this.medicalHistory.push(appointment);
    }
}

class MedicalStaff extends Person {
    staffID: number;
    position: string;
    department: string;

    constructor(firstName: string, lastName: string, age: number, address: string, staffID: number, position: string, department: string) {
        super(firstName, lastName, age, address)
        this.staffID = staffID;
        this.position = position;
        this.department = department;
    }

    getFullDetails(): string {
        return `${this.firstName} ${this.lastName} ${this.age} ${this.address}`;
    }
}

class Doctor extends MedicalStaff {
    doctorID: number;
    specialization: string;
    availability: string[];
    ageRange: [number, number];

    constructor(firstName: string, lastName: string, age: number, address: string, doctorID: number, specialization: string, availability: string[], staffID: number, position: string, department: string, ageRange: [number, number]) {
        super(firstName, lastName, age, address, staffID, position, department);
        this.doctorID = doctorID;
        this.specialization = specialization;
        this.availability = availability;
        this.ageRange = ageRange;
    }

    getFullDetails(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    doctorDetails(): void {
        console.log(`Doctor: doctorID: ${this.doctorID} Name: ${this.getFullDetails()} specialization: ${this.specialization}`);
    }
}

class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;
    status: string;

    constructor(patient: Patient, doctor: Doctor, date: string, time: string, status: string = "active") {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;
    }

    appointmentDetails(): void {
        console.log(`Dear ${this.patient.getFullDetails()}\n you have an appointment with a doctor ${this.doctor.specialization} named ${this.doctor.getFullDetails()} on ${this.date} at ${this.time}`);
    }

    cancelApointment(): void {
        this.status = "canceled";
    }

    completedApointment(): void {
        this.status = "completed";
    }
}

class MedicalRecord {
    patient: Patient;
    doctor: Doctor;
    diagnosis: string;
    prescription: string;

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }
}

class Hospital {
    arrayPatients: Patient[];
    arrayDoctors: Doctor[];
    arrayAppointments: Appointment[];
    arrayMedicalRecord: MedicalRecord[];

    constructor(arrayPatients: Patient[], arrayDoctors: Doctor[], arrayAppointments: Appointment[], arrayMedicalRecord: MedicalRecord[]) {
        this.arrayPatients = arrayPatients;
        this.arrayDoctors = arrayDoctors;
        this.arrayAppointments = arrayAppointments;
        this.arrayMedicalRecord = arrayMedicalRecord;
    }

    addPatient(patient: Patient): void {
        this.arrayPatients.push(patient);
    }

    addDoctor(doctor: Doctor): void {
        this.arrayDoctors.push(doctor);
    }

    addAppointment(newAppointment: Appointment) {
        this.arrayAppointments.forEach(appointment => {
            const ageRangeApointment = newAppointment.doctor.ageRange[0] < newAppointment.patient.age && newAppointment.doctor.ageRange[1] > newAppointment.patient.age;
            const availabilityApintment = appointment.date !== newAppointment.date && appointment.time !== newAppointment.time;
            if (availabilityApintment && ageRangeApointment) {
                this.arrayAppointments.push(newAppointment);
                console.log("The appointment has been set successfully");
                return "The appointment has been set successfully";
            } else {
                console.log("The appointment is not available");
            }
        })
    }

    allAppointmentDetails(): void {
        this.arrayAppointments.forEach(appointment => {
            appointment.appointmentDetails();
        });
    }

    allAppointmentDetailsByDoctorID(id: number): void {
        this.arrayAppointments.forEach(appointment => {
            if (appointment.doctor.doctorID === id) {
                appointment.appointmentDetails();
            }
        });
    }

    allAppointmentDetailsByPatientID(id: number): void {
        this.arrayAppointments.forEach(appointment => {
            if (appointment.patient.PatientID === id) {
                appointment.appointmentDetails();
            }
        });
    }

    allAppointmentDetailsByDate(date: string): void {
        this.arrayAppointments.forEach(appointment => {
            if (appointment.date === date) {
                appointment.appointmentDetails();
            }
        })
    }

    getDoctorBySpecialization(specialization: string): void {
        this.arrayDoctors.forEach(doctor => {
            if (specialization === doctor.specialization) {
                doctor.doctorDetails();
            }
        })
    }

    createMedicalRecord(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string): void {
        this.arrayMedicalRecord.push({ patient, doctor, diagnosis, prescription });
    }

    getMedicalRecord(patientID: number): MedicalRecord[] {
        const arrMedicalRecordPatient: MedicalRecord[] = []
        this.arrayMedicalRecord.forEach(medicalRecord => {
            if (medicalRecord.patient.PatientID === patientID) {
                arrMedicalRecordPatient.push(medicalRecord);
            }
        });
        return arrMedicalRecordPatient;
    }

    getDoctorSchedule(doctorID: number, date: string): Appointment[] {
        const arrAppointmentsByDate: Appointment[] = [];
        this.arrayAppointments.forEach(apoinment => {
            if (apoinment.doctor.doctorID === doctorID && apoinment.date === date) {
                arrAppointmentsByDate.push(apoinment);
            }
        });
        return arrAppointmentsByDate;
    }

    getDoctorAvailability(doctorID: number): string[] | undefined {
        let arrAvailability: string[] | undefined;
        this.arrayDoctors.forEach(doctor => {
            if (doctor.doctorID === doctorID) {
                arrAvailability = doctor.availability;
            }
        });
        return arrAvailability;
    }
}

const patient1 = new Patient("Alice", "Johnson", 35, "123 Main St", 1001, 1234567890, 9876543210);
const patient2 = new Patient("John", "Smith", 45, "456 Elm Ave", 1002, 9876543210, 1234567890);
const patient3 = new Patient("Emily", "Williams", 28, "789 Oak Rd", 1003, 5555555555, 6666666666);
const patient4 = new Patient("Michael", "Brown", 62, "567 Pine Blvd", 1004, 1111111111, 2222222222);
const patient5 = new Patient("Olivia", "Davis", 40, "890 Cedar St", 1005, 9998887777, 7778889999);

const arrayPatients = [patient1, patient2, patient3, patient4];

const doctor1 = new Doctor("Dr. Sarah", "Miller", 40, "123 Park Ave", 2001, "Cardiologist", ["Monday", "Wednesday"], 3001, "Senior Doctor", "Cardiology", [30, 60]);
const doctor2 = new Doctor("Dr. James", "Clark", 38, "456 Oak Ave", 2002, "Pediatrician", ["Tuesday", "Thursday"], 3002, "Senior Doctor", "Pediatrics", [0, 18]);
const doctor3 = new Doctor("Dr. Emily", "Harris", 42, "789 Maple Rd", 2003, "Dermatologist", ["Wednesday", "Friday"], 3003, "Senior Doctor", "Dermatology", [25, 70]);
const doctor4 = new Doctor("Dr. Michael", "Smith", 55, "567 Elm St", 2004, "Orthopedic Surgeon", ["Monday", "Thursday"], 3004, "Senior Doctor", "Orthopedics", [40, 80]);
const doctor5 = new Doctor("Dr. Sophia", "Johnson", 50, "234 Cedar Ave", 2005, "Neurologist", ["Tuesday", "Friday"], 3005, "Senior Doctor", "Neurology", [25, 70]);

const arrayDoctors = [doctor1, doctor2, doctor3, doctor4];

const appointment1 = new Appointment(patient1, doctor1, "2023-08-15", "10:00 AM", "Completed");
const appointment2 = new Appointment(patient2, doctor2, "2023-07-10", "9:15 AM", "Active");
const appointment3 = new Appointment(patient3, doctor3, "2023-08-02", "3:45 PM", "Completed");
const appointment4 = new Appointment(patient4, doctor4, "2023-06-10", "1:30 PM", "Completed");
const appointment5 = new Appointment(patient5, doctor5, "2023-09-20", "11:00 AM", "Active");

const arrayAppointments = [appointment1, appointment2, appointment3, appointment4];

patient1.addAppointmentToMedicalHistory(new Appointment(patient1, doctor1, "2023-08-15", "10:00 AM", "Completed"));
patient1.addAppointmentToMedicalHistory(new Appointment(patient1, doctor2, "2023-05-10", "2:30 PM", "Completed"));

patient2.addAppointmentToMedicalHistory(new Appointment(patient2, doctor3, "2023-07-20", "9:00 AM", "Completed"));
patient2.addAppointmentToMedicalHistory(new Appointment(patient2, doctor4, "2023-04-18", "3:30 PM", "Completed"));

patient3.addAppointmentToMedicalHistory(new Appointment(patient3, doctor1, "2023-08-02", "11:45 AM", "Completed"));
patient3.addAppointmentToMedicalHistory(new Appointment(patient3, doctor5, "2023-05-25", "4:00 PM", "Completed"));

patient4.addAppointmentToMedicalHistory(new Appointment(patient4, doctor2, "2023-06-10", "10:30 AM", "Completed"));
patient4.addAppointmentToMedicalHistory(new Appointment(patient4, doctor3, "2023-03-15", "2:15 PM", "Completed"));

patient5.addAppointmentToMedicalHistory(new Appointment(patient5, doctor4, "2023-09-20", "11:00 AM", "Active"));
patient5.addAppointmentToMedicalHistory(new Appointment(patient5, doctor1, "2023-07-05", "3:30 PM", "Active"));

const medicalRecords = [
    new MedicalRecord(patient1, doctor1, "Common cold", "Rest and drink fluids"),
    new MedicalRecord(patient1, doctor2, "Annual checkup", "Routine health assessment"),
    new MedicalRecord(patient2, doctor3, "Fever", "Prescribed medication and rest"),
    new MedicalRecord(patient2, doctor4, "Sprained wrist", "Wrist brace and pain relief"),
    new MedicalRecord(patient3, doctor1, "Migraine", "Prescribed pain medication"),
    new MedicalRecord(patient3, doctor5, "Allergy test", "Identified allergens"),
    new MedicalRecord(patient4, doctor2, "Arthritis check", "Recommended exercises and pain management"),
    new MedicalRecord(patient4, doctor3, "Diabetes check", "Diet and lifestyle recommendations"),
    new MedicalRecord(patient5, doctor4, "Initial consultation", "Outlined treatment options"),
    new MedicalRecord(patient5, doctor1, "Follow-up", "Reviewed progress and adjusted treatment")
  ];  


const TelHashomer = new Hospital(arrayPatients, arrayDoctors, arrayAppointments, medicalRecords);