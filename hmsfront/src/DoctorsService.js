import axios from "axios";
let addDoctor="http://localhost:8080/hms/createDoctor"
let ShowDoctors="http://localhost:8080/hms/getAllDoctors"
let updateDoctor="http://localhost:8080/hms/updatedoctor"
let deleteDoctor="http://localhost:8080/hms/deletedoctor"
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

    deleteDoctor(doctorid)
    {
        return axios.get(`${deleteDoctor}/${doctorid}`)
    }

}
export default new DoctorsService();