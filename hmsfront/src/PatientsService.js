import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> b958b4d77e38ac2438beb8e541f2f25e162150d1
let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";
let searchpatients="http://localhost:8080/hms/searchpatientsByName";
let deletepatients="http://localhost:8080/hms/deleteById";
let updatepatients="http://localhost:8080/hms/update";
class PatientsService{
    getPatients(){
        return axios.get(showp);
    }
    CreatePatients(Patient){
        console.log(addp);
        return axios.post(addp,Patient);

    }

    SearchPatients(name)
    {
        return axios.get(`${searchpatients}/${name}`)
    }

    deletepatients(id) {
        return axios.delete(`${deletepatients}/${id}`); 
      }

    updatePatient(id,updateData)
    {
          return axios.put(`${updatepatients}/${id}`,updateData);
    }

}
export default new PatientsService();