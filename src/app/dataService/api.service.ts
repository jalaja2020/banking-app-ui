import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData = (url) => {
    return this.http.get<any>(url);
  }
  postData = (url,postObj) => {
    return this.http.post(url,postObj);
  }
  updateData = (url,putObj) => {
    return this.http.put(url,putObj);
  }
  deleteData = (url) => {
    return this.http.delete(url);
  }
}
