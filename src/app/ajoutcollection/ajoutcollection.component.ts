import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../produit.service";
import {PersonneService} from "../personne.service";
import {CollectionproduitService} from "../collectionproduit.service";
import Collection from "../interface/Collection";
import {numbers} from "@material/dialog";

@Component({
  selector: 'app-ajoutcollection',
  templateUrl: './ajoutcollection.component.html',
  styleUrls: ['./ajoutcollection.component.css']
})
export class AjoutcollectionComponent implements OnInit {
  public nom: string="";
  public PhotoFileName: string="";
  public idUser: number=0;
  public idproduit: number=0;
  public listCollection:[]=[];
  public listCollectionparId:Collection[]=[];
 public  collectionId: number|undefined=0;
  private strQRCODE: string="";



  constructor(public collectionService:CollectionproduitService,public messageService: MessageService, private http:HttpClient,private route:ActivatedRoute, private  produiService:ProduitService, private router:Router, private personneService:PersonneService) { }

  ngOnInit(): void {
    this.collectionService.getCollections$().subscribe(data=>{
      this.listCollection=data.message;

      console.log(data.message);

    })
    this.route.paramMap.subscribe(params=>{
      let id= params.get("id");
      console.log(id);
    })



    console.log(this.route.snapshot.params['id'])
    let id=this.route.snapshot.params['id'];
    console.log("//");
    console.log(id);
    if(id!=null&&id!=undefined){
      this.collectionService.getCollectionById$(this.route.snapshot.params['id']).subscribe(data=>{
        this.listCollectionparId=data.message;
        this.messageService.setMessage(""+JSON.stringify(data.message));
        this.nom=this.listCollectionparId[0].nom;
        this.idUser=this.listCollectionparId[0].idUser;
        this.idproduit=this.listCollectionparId[0].idProduit;
        this.collectionId=this.listCollectionparId[0].id;

        console.log(this.collectionId)
      })
    }
    this.listCollectionparId.forEach(collection=>{
      this.strQRCODE+=" "+JSON.stringify(collection);
    })


  }
  modifierCollection(){
    this.collectionService.updateCollectionById$( this.nom, +this.idproduit, +this.idUser, +(""+this.collectionId)).subscribe(data=>{
      this.messageService.setMessage(""+JSON.stringify(data.message));;
      this.rechargeClick();
    })



  }
  ajouterCollection(){
    this.collectionService.ajoutCollection$( this.nom, +this.idproduit, +this.idUser).subscribe(data=>{
      this.messageService.setMessage(""+JSON.stringify(data.message));;
      this.rechargeClick();
    })
  }


  rechargeClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./collection'])
  }



}
