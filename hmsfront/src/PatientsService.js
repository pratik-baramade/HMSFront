import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> ad9186af0bd719d8f83afbd70888ebc00eff6b95
let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";
let searchpatients="http://localhost:8080/hms/searchpatientsByName";
let deletepatients="http://localhost:8080/hms/deleteById";
let updatepatients="http://localhost:8080/hms/update";
<<<<<<< HEAD
=======

>>>>>>> ad9186af0bd719d8f83afbd70888ebc00eff6b95
class PatientsService{
    getPatients(){
        return axios.get(showp);
    }
    CreatePatients(Patient){
      return axios.post(addp,Patient);

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