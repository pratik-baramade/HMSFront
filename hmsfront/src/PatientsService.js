import axios from "axios";
let ViewPatient="http://localhost:8080/Hms/createPatients";
let addp="";
class PatientsService{
    getPatients(){
        return axios.get(ViewPatient);
    }
    CreatePatients(Patient){
        return axios.post(addp,Patient);

    }

}
export default new PatientsService();