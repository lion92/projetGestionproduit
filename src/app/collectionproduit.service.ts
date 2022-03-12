import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Collection from "./interface/Collection";


@Injectable({
  providedIn: 'root'
})
export class CollectionproduitService {

  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  url="http://localhost:8000/";
  public CollectionUrl:string="selectCollections";
  private CollectionByidUrl:string="selectCollectionParId"
  private updateCollectionService:string="updateCollection"

  private ajouterCollection:string="ajoutCollection"
  private deleteCollection:string="deleteColletcion"
  private CollectionByEmailUrl: string="selectCollectionParEmail";
  constructor(private  http:HttpClient) { }
  getCollections$(): Observable<any> {
    let res: Observable<Collection[]> = this.http.get<any[]>(
      this.url + this.CollectionUrl,
      this.optionRequete
    );
    console.log(res);
    return res;
  }

  getCollectionById$(id:number): Observable<any> {
    let res: Observable<Collection[]> = this.http.get<any[]>(
      this.url + this.CollectionByidUrl + "/" + id,
      this.optionRequete
    );
    console.log(res);
    return res;
  }
  getCollectionByEmail$(email:string): Observable<any> {
    let res: Observable<Collection[]> = this.http.get<any[]>(
      this.url + this.CollectionByEmailUrl + "/" + email,
      this.optionRequete
    );
    console.log(res);
    return res;
  }


  updateCollectionById$( nom:string, idProduitCollection:number, idUSer:number,idCollection:number): Observable<any> {
    let res: Observable<Collection[]> = this.http.put<any[]>(
      this.url + this.updateCollectionService,
      {nom: nom, idProduitCollection:idProduitCollection, idUSer:idUSer,idCollection:idCollection},
      this.optionRequete

    );
    console.log(res);
    return res;
  }



  ajoutCollection$( nom:string, idProduitCollection:number, idUSer:number): Observable<any> {
    let res: Observable<Collection[]> = this.http.post<any[]>(
      this.url + this.ajouterCollection,
      {nom: nom, idProduitCollection:idProduitCollection, idUSer:idUSer},
      this.optionRequete

    );
    console.log(res);
    return res;
  }

  supprimerCollection$( idCollection:number): Observable<any> {
    let res: Observable<Collection[]> = this.http.delete<any[]>(
      this.url + this.deleteCollection+"/"+idCollection,
      this.optionRequete

    );
    console.log(res);
    return res;
  }
}
