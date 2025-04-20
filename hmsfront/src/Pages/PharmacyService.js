import axios from "axios";

const addp = "http://localhost:8080/hms/CreatePharmacy";
const showp = "http://localhost:8080/hms/ViewAllPharmacy";
const searchPharmacy = "http://localhost:8080/hms/searchPharmacyName";
const deletePharmacy = "http://localhost:8080/hms/isDelate";
const updatePharmacy = "http://localhost:8080/hms/isupdatePharmacy";

class PharmacyService {
  getPharmacy() {
    return axios.get(showp);
  }

  CreatePharmacy(pharmacy) {
    console.log("POST URL:", addp);
    return axios.post(addp, pharmacy);
  }

  SearchPharmacy(name) {
    return axios.get(`${searchPharmacy}/${name}`);
  }

  deletePharmacy(id) {
    return axios.delete(`${deletePharmacy}/${id}`);
  }

  updatePharmacy(id, updateData) {
    return axios.put(`${updatePharmacy}/${id}`, updateData);
  }
}

// ✅ Export a single instance
export default new PharmacyService();
