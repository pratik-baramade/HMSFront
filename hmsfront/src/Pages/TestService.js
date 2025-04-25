
import axios from "axios";

const addtest = "http://localhost:8080/hms/Addtest";
const gettest = "http://localhost:8080/hms/getTest";

class TestService {
  createTest(test) {
    return axios.post(addtest, test);
  }

  getAllTests() {
    return axios.get(gettest);
  }
}

export default new TestService(); 
