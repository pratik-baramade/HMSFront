import axios from "axios";
let addDoctor="http://localhost:8080/hms/createDoctor"
let ShowDoctors="http://localhost:8080/hms/getAllDoctors"
let updateDoctor="http://localhost:8080/hms/updatedoctor"
class DoctorsService{

    CreateDoctor(Doctor){
        return axios.post(addDoctor,Doctor);

    }


    getDoctors(){
        return axios.get(ShowDoctors);
    }

    updateDoctor(doctorid,updateData)
    {
        return axios.put(`${updateDoctor}/${doctorid}`,updateData);
    }
}
export default new DoctorsService();