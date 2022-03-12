import { Component, OnInit } from '@angular/core';
import {PersonneService} from "../personne.service";
import Personne from "../interface/Personne";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {MessageService} from "../message.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserserviceService} from "../userservice.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public personnebyId:Personne[]=[];
  public nom: any;
  public prenom: any;
  public age: any;
  public ville: any;
  public numero: any;
  public adresse: string="";
  public codePostale: string="";
  public email: any;
  public idPersonne: number=0;
  dateAjout: any;
  PhotoFileName: string="";
  public listpersonne:Personne[]=[];
  public elementType:any=NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public strQRCODE:string="";
  public passaword: string="";
  public password2: string="";
  constructor(private userService: UserserviceService, private http:HttpClient, public personneService:PersonneService, public messageService:MessageService,private router:Router ) { }

  ngOnInit(): void {
  }
  ajouterPersonne(){
    if(this.passaword===this.password2){
    this.personneService.ajoutPersonne$( this.nom, this.prenom, this.age, this.ville, this.numero, this.adresse, this.codePostale, this.email).subscribe(data1=>{
      let emailEncours=this.email;
      this.messageService.setMessage(""+JSON.stringify(data1.message));

      if(data1.status===200){
        alert("ok");
        this.personneService.getPersonneByEmail$(emailEncours).subscribe(data2=>{
          console.log(data2.message)
          let idencous=data2.message[0].idPersonne;
          this.userService.ajoutUser$(idencous, this.passaword).subscribe(data3=>{
            console.log(data3.message)
          })


        })

      }


      this.rechargeClick();

    })
    }
  }
  rechargeClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./register'])
  }
  imageUpload($event: any) {
    let file =$event.target.files[0];
    const formData:FormData=new FormData();
    formData.set("avatar", file);
    this.http.post("http://localhost:8000/AjoutPhoto",formData).subscribe(data=> {

      console.log(file);
      this.personneService.updatePersonneByIdImage$(file.name, this.idPersonne).subscribe(data2=>{

      })
      this.personneService.getPersonneById$(this.idPersonne).subscribe(data3=>{

        this.PhotoFileName="http://localhost:8000/"+data3.message.image;

      })
    })
  }

}
