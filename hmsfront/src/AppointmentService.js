import axios from "axios";
let addAppointment="http://localhost:8080/hms/createAppointment";
let ShowAppointment="http://localhost:8080/hms/getAllAppointments";
let updateAppointment="http://localhost:8080/hms/updateAppointments";
class AppointmentService{
    CreateAppointment(Appointment){
        return axios.post(addAppointment,Appointment);

    }
    getAppointment(){
        return axios.get(ShowAppointment);
    }
    updateAppointment(Appointmentid,updateData)
    {
        return axios.put(`${updateAppointment}/${Appointmentid}`,updateData);
    }
}
export default new AppointmentService();