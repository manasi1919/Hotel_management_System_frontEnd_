import axios from 'axios';

const BASE_URL="http://localhost:8080/api/payment";

class PaymentServices  {
 getPayments(){
    return axios.get(`${BASE_URL}/all`);
 }

 deletePayment(id){
   return axios.delete(`${BASE_URL}/${id}`);
}
getPaymentById(id) {
   return axios.get(`${BASE_URL}/${id}`);
 }
 
 addPayment(payment) {
   return axios.post(`${BASE_URL}/post`, payment);
 }
 getPaymentsByStatus(status) {  
  return axios.get(`${BASE_URL}/status/${status}`);
}

getTotalRevenue() { 
  return axios.get(`${BASE_URL}/total-revenue`);
}
}

export default new PaymentServices();