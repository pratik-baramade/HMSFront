import axios from "axios";
let addbill="http://localhost:8080/hms/createBill"
let showbill="http://localhost:8080/hms/getAllBills";
let getbillbyid="http://localhost:8080/hms/getbillById"
let getallbillwithname="http://localhost:8080/hms/getAllBillsWithName";
let updatepaymentStatus="http://localhost:8080/hms/billing/pay"
let BillByBillId="http://localhost:8080/hms/getbillByBilId";
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

getAllBillWithName()
{
    return axios.get(getallbillwithname);
}
updatePayment(billId, paymentMode) {
    return axios.put(`${updatepaymentStatus}/${billId}`, { paymentMode });
  }

  getBillByBillId(billId) {
    return axios.get(`${BillByBillId}/${billId}`);
  }
}

export default new BillingService();