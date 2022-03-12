import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

class User {
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  url="http://localhost:8000/";
  public UserUrl:string="selectUsers";
  private UserByidUrl:string="selectUserParid"
  private updateUserService:string="updateUser"
  private updateUserImage:string="updateUserImage"
  private ajouterUser:string="ajoutUser"
  private deleteUser:string="deleteUser"
  private loginURL: string="login";
  private boolConnecter: boolean=false;
  constructor(private  http:HttpClient) { }

  getUsers$(): Observable<any> {
    let res: Observable<User[]> = this.http.get<any[]>(
      this.url + this.UserUrl,
      this.optionRequete
    );
    console.log(res);
    return res;
  }

  getUserById$(id:string): Observable<any> {
    let res: Observable<User[]> = this.http.get<any[]>(
      this.url + this.UserByidUrl + "/" + id,
      this.optionRequete
    );
    console.log(res);
    return res;
  }
  updateUserById$( idUSer:number, idPersonneUser:number, motDePasse:number, email:string): Observable<any> {
    let res: Observable<User[]> = this.http.put<any[]>(
      this.url + this.updateUserService,
      {idPersonneUser:idPersonneUser, motDePasse:motDePasse, email:email, idUser:idUSer},
      this.optionRequete

    );
    console.log(res);
    return res;
  }

  updateUserByIdImage$( image:string, idUser:number): Observable<any> {
    let res: Observable<User[]> = this.http.put<any[]>(
      this.url + this.updateUserImage,
      {image:image,idUser:idUser},
      this.optionRequete

    );
    console.log(res);
    return res;
  }

  login$(email:string, mdp:string, token:string): Observable<any> {
    let res: Observable<User[]> = this.http.post<any[]>(
      this.url + this.loginURL,
      {email:email, password:mdp, token:token},
      this.optionRequete

    );
    console.log(res);
    return res;
  }
  boolConnecterTest(){
    if(localStorage.getItem("token")==="deconnecter"){
      this.boolConnecter=false;
    }else{
      this.boolConnecter=true;
    }
  }
  getBoolConnecter(){
    return this.boolConnecter;
  }

  ajoutUser$( idPersonneUser:number, motDePasse:string): Observable<any> {
    let res: Observable<User[]> = this.http.post<any[]>(
      this.url + this.ajouterUser,
      {idPersonne:idPersonneUser, mdp:motDePasse},
      this.optionRequete

    );
    console.log(res);
    return res;
  }

  supprimerUser$( idUser:number): Observable<any> {
    let res: Observable<User[]> = this.http.delete<any[]>(
      this.url + this.deleteUser+"/"+idUser,
      this.optionRequete

    );
    console.log(res);
    return res;
  }
}
