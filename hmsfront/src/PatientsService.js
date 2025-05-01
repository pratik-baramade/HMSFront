import axios from "axios";
<<<<<<< HEAD
let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";
let searchpatients="http://localhost:8080/hms/searchpatientsByName";
let deletepatients="http://localhost:8080/hms/deleteById";
let updatepatients="http://localhost:8080/hms/update";
=======

let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";
>>>>>>> origin/Pratik

class PatientsService{
    getPatients(){
        return axios.get(showp);
    }
    CreatePatients(Patient){
<<<<<<< HEAD
      return axios.post(addp,Patient);

=======
        return axios.post(addp,Patient);
          
>>>>>>> origin/Pratik
    }

    SearchPatients(name)
    {
        return axios.get(`${searchpatients}/${name}`)
    }

    deletepatients(id) {
        return axios.get(`${deletepatients}/${id}`); 
      }

    updatePatient(id,updateData)
    {
          return axios.put(`${updatepatients}/${id}`,updateData);
    }

}
export default new PatientsService();