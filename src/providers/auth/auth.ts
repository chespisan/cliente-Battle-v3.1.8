import { Storage } from '@ionic/storage';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthProvider {

  // creamos la variable publica de token
  public token: any;

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
    console.log('Hello AuthProvider Provider');
  }

  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            //let headers = new HttpHeaders();
            //headers.append('Authorization', this.token);
 
            this.http.get('https://git.heroku.com/api/auth/protected')
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  };

  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        //let headers = new HttpHeaders();

        //headers.append('Content-Type', 'application/json');
        // this.http.post('localhost:8080/api/auth/register', JSON.stringify(details), {headers: headers}) -> deprecated

        this.http.post('https://git.heroku.com/api/auth/register',details)
          .subscribe(res => {
 
            let data; //= res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        //let headers = new HttpHeaders();
        //headers.append('Content-Type', 'application/json');
 
        this.http.post('https://git.heroku.com/api/auth/login',credentials)
          .subscribe(res => {
 
            let data; // = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
            //resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}




