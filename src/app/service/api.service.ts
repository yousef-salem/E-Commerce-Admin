import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions ;
  constructor(private httpClient : HttpClient) {
    this.httpOptions =  {
      headers :  new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  } ;
   }
  
  getAll<T>(endPoint:string):Observable<T>{
    return this.httpClient.get<T>(`${environment.apiUrl}${endPoint}`);
    }
  
    getById<T>(endPoint:string):Observable<T>{
      return this.httpClient.get<T>(`${environment.apiUrl}${endPoint}`);
    }

    add<T>(endPoint:string , body :any){
      return this.httpClient.post<T>(`${environment.apiUrl}${endPoint}` , body ,this.httpOptions);
    }

    update<T>(endPoint:string , body :any ){
      return this.httpClient.put<T>(`${environment.apiUrl}${endPoint}` , body ,this.httpOptions);
    }

    Delete<T>(endPoint:string , body? :any ):Observable<T>{
      return this.httpClient.delete<T>(`${environment.apiUrl}${endPoint}`);
    }
    onResponseSuccess(Title :string, body : string){
      console.log(body, Title, { timeOut: 2000 });
    }
    onResponsefaild(error : any){
      console.log(error.message, 'Error', { timeOut: 4000 });
        // console.log(error); 
    }
  }