import axios from "axios";
let addAppointment="http://localhost:8080/hms/createAppointment";
class AppointmentService{
    CreateAppointment(Appointment){
        return axios.post(addAppointment,Appointment);

    }

}
export default new AppointmentService();