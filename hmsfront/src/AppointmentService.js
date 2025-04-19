import axios from "axios";
let addAppointment="http://localhost:8080/hms/createAppointment";
let ShowAppointment="http://localhost:8080/hms/getAllAppointments";
class AppointmentService{
    CreateAppointment(Appointment){
        return axios.post(addAppointment,Appointment);

    }
    getAppointment(){
        return axios.get(ShowAppointment);
    }

}
export default new AppointmentService();