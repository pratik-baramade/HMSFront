import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> d977c052063310ddd5c54f71ee2478ba7fb910ae
let addp="http://localhost:8080/hms/createPatients";
let showp="http://localhost:8080/hms/getAllPatients";
let searchpatients="http://localhost:8080/hms/searchpatientsByName";
let deletepatients="http://localhost:8080/hms/deleteById";
let updatepatients="http://localhost:8080/hms/update";
<<<<<<< HEAD
let AddMedicaleCertificate="http://localhost:8080/hms/CreateMediCerti";
let ViewAllCertificates="http://localhost:8080/hms/ViewCertificates";
=======
>>>>>>> d977c052063310ddd5c54f71ee2478ba7fb910ae
class PatientsService{
    getPatients(){
        return axios.get(showp);
    }

    getCertificate()
    {
      return axios.get(ViewAllCertificates);
    }

    
    CreateCertificate(Certificate)
    {
      return axios.post(AddMedicaleCertificate,Certificate);
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