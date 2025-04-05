import axios from "axios";
let View="http://localhost:8080/Hms/getAllPatients";
let addp="http://localhost:8080/Hms/createPatients";
class PatientsService{
    getPatients(){
        return axios.get(View);
    }
    CreatePatients(Patient){
        return axios.post(addp,Patient);
          
    }

}
export default new PatientsService();