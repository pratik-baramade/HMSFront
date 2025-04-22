import axios from "axios";
let addPricription="http://localhost:8080/hms/createpricription";
let showPrescriptionbyId="http://localhost:8080/hms/getprescription"
class CheckupService{
    showPrescriptionByID(id) {
        return axios.get(`${showPrescriptionbyId}/${id}`); 
      }

      CreatePrescription(Checkup){
        return axios.post(addPricription,Checkup);
  
      }
  
}
export default new CheckupService();