import axios from "axios";
let addPricription="http://localhost:8080/hms/createpricription";
let showPrescriptionbyId="http://localhost:8080/hms/getprescription"
let showAllPerscription="http://localhost:8080/hms/getAllPericription"
class CheckupService{
    
    showPrescriptionByID(id) {
        return axios.get(`${showPrescriptionbyId}/${id}`); 
      }

      CreatePrescription(Checkup){
        return axios.post(addPricription,Checkup);
  
      }
  

      ShowAllPerscription()
      {
        return axios.get(showAllPerscription);
      }
}
export default new CheckupService();