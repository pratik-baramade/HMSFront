import axios from "axios";

let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";

class PatientsService{
    getPatients(){
        return axios.get(showp);
    }
    CreatePatients(Patient){
        return axios.post(addp,Patient);
          
    }

}
export default new PatientsService();