import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) {

  }



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    })
  };

  //Donor Apis

  getUsers(){
    return this.http.get(environment.NODE_HOST + '/getUsers', this.httpOptions);
  }

  getTransactions(ngoid){
    const payload = ngoid
    return this.http.post(environment.NODE_HOST + '/getTransactions',{ NGOId: payload }, this.httpOptions);
  }

  updateTransaction(tId, status,key){
    const payload = tId
    const statusPayload = status
    const payloadkey = key
    return this.http.post(environment.NODE_HOST + '/updateTransaction',{ tId: payload, status: statusPayload,key:payloadkey}, this.httpOptions);
  }

  getDonorLogin(userdata){
    const regno = userdata.regno;
    const password = userdata.password;
    return this.http.post(environment.NODE_HOST + '/getDonorLogin',{ regno: Number(regno),pass: Number(password) }, this.httpOptions);
  }

  getUserRequest(ngoId){
    const payload = JSON.stringify(ngoId)
    return this.http.post(environment.NODE_HOST + '/getUserRequest',{ NGOId: payload }, this.httpOptions);
  }

  getFamilyLatLng(id){
    const idPayload = id;
    return this.http.post(environment.NODE_HOST + '/getFamilyLatLng',{NGOId: idPayload}, this.httpOptions);
  }
  getFamilyLatLngForGovernment(){
    return this.http.get(environment.NODE_HOST + '/getFamilyLatLngForGovernment', this.httpOptions);
  }

  getNGOLatLng(){
    return this.http.get(environment.NODE_HOST + '/getNGOLatLng', this.httpOptions);
  }

  getNGOCapacity(name){
    const payload = name
    return this.http.post(environment.NODE_HOST + '/getNGOCapacity',{ NGOId: payload }, this.httpOptions);
  }

  getNGOBeneficiaries(id){
    const payload = id
    return this.http.post(environment.NODE_HOST + '/getNGOBeneficiaries',{ NGOId: payload }, this.httpOptions);
  }
  getNGOUnprocessedRequests(){
    return this.http.get(environment.NODE_HOST + '/getNGOUnprocessedRequests', this.httpOptions);
  
  }

  getRequestStatusCountForNGO(regno){
    const payload = regno
    return this.http.post(environment.NODE_HOST + '/getRequestStatusCountForNGO',{ regno: payload }, this.httpOptions);
  
  }

  getRequestDateChart(regno){
    const payload = regno
    return this.http.post(environment.NODE_HOST + '/getRequestDateChart',{ NGOId: payload }, this.httpOptions);
  }

  getMonthlyRequest(regno){
    const payload = regno
    return this.http.post(environment.NODE_HOST + '/getMonthlyRequest',{ NGOId: payload }, this.httpOptions);
 
  }

  closeConnectionFromDB(){
    return this.http.post(environment.NODE_HOST + '/closeConnection', this.httpOptions);
  }



  //Government APIS
  getTransactionsForGovernment(){
    return this.http.get(environment.NODE_HOST + '/getTransactionsForGovernment', this.httpOptions);
  }

  getUserRequestForGovernment(){
    return this.http.get(environment.NODE_HOST + '/getUserRequestForGovernment', this.httpOptions);
  }
getNGOCapacityForGovernment(){
  
    return this.http.get(environment.NODE_HOST + '/getNGOCapacityForGovernment', this.httpOptions);
  }

  getNGOBeneficiariesForGovernment(){
    
    return this.http.get(environment.NODE_HOST + '/getNGOBeneficiariesForGovernment', this.httpOptions);
  }
  getNGOUnprocessedRequestsForGovernment(){
     
    return this.http.get(environment.NODE_HOST + '/getNGOUnprocessedRequestsForGovernment', this.httpOptions);
  
  }

  getRequestStatusCountForNGOForGovernment(){
    
    return this.http.get(environment.NODE_HOST + '/getRequestStatusCountForGovernment', this.httpOptions);
  
  }

  getRequestDateChartForGovernment(){
    
    return this.http.get(environment.NODE_HOST + '/getRequestDateChartForGovernment', this.httpOptions);
  }

  getProvinceDataForGovernment(){
    return this.http.get(environment.NODE_HOST + '/getProvinceDataForGovernment', this.httpOptions);
  }

  getMonthlyRequestForGovernment(){
    return this.http.get(environment.NODE_HOST + '/getMonthlyRequestForGovernment', this.httpOptions);
  }
}
