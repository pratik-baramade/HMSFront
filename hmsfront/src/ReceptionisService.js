import axios from "axios";
let addr="http://localhost:8080/hms/AddReceptionist";
let showr="http://localhost:8080/hms/Viewreceptionists";
let searchReceptionis="http://localhost:8080/hms/searchReceptionistByName";
let deleteReceptionis="http://localhost:8080/hms/DeleteReceptionis";
let updateReceptionis="http://localhost:8080/hms/updateReceptionist";
class ReceptionisService{
    getReceptionis(){
        return axios.get(showr);
    }
    CreateReceptionis(Receptionis){
        return axios.post(addr,Receptionis);

    }
    searchReceptionis(name) {
        return axios.get(`${searchReceptionis}/${name}`);
    }    

    deleteReceptionis(id)
    {
        return axios.delete(`${deleteReceptionis}/${id}`)

    }

    updateReceptionis(id,updateData)
    {
          return axios.put(`${updateReceptionis}/${id}`,updateData);
    }

}
export default new ReceptionisService();