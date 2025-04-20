import axios from "axios";
let showbill="http://localhost:8080/hms/getAllBills";
let getbillbyid="http://localhost:8080/hms/getbillById"
class BillingService{
getAllbills()
{
    return axios.get(showbill);
}

getAllBillByID(patientsId)
{
    return axios.get(`${getbillbyid}/${patientsId}`)
}
}

export default new BillingService();