import axios from "axios";
let addbill="http://localhost:8080/hms/createBill"
let showbill="http://localhost:8080/hms/getAllBills";
let getbillbyid="http://localhost:8080/hms/getbillById"
class BillingService{
    CreateBill(bill){
        return axios.post(addbill,bill);
    }
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