import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

import {ProduitService} from "../produit.service";
import {AjoutclientComponent} from "../ajoutclient/ajoutclient.component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Collection from "../interface/Collection";
import {CollectionproduitService} from "../collectionproduit.service";
import {AjoutcollectionComponent} from "../ajoutcollection/ajoutcollection.component";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  public listCollection: Collection[]=[];
  public pageSlice:  Collection[]=[];
  public isOpen: boolean=false;
  public listId: number[]=[];


  constructor(public collectionService:CollectionproduitService,public messageService:MessageService,private dialog:MatDialog,private route:ActivatedRoute, private  produiService:ProduitService, private router:Router) { }

  ngOnInit(): void {
    this.collectionService.getCollections$().subscribe(data=>{
      this.listCollection=data.message;
      this.pageSlice=this.listCollection.slice(0,1);
      console.log(data.message);
    })
    this.route.paramMap.subscribe(params=>{
      let id= params.get("id");
      console.log(id);
    })
  }
  openDialog() {
    this.dialog.open(AjoutcollectionComponent,{
      height: '80%',
      width:'50vw',
      autoFocus: false,

    });
  }

  supprimerCollection(idClient:number){

    this.collectionService.supprimerCollection$(+idClient).subscribe(data=>{
      this.messageService.setMessage(""+JSON.stringify(data.message));;
      this.rechargeClick();
    })
  }

  supprimerListCollection(listAsupprimer:number[]){
    listAsupprimer.forEach(data=>{
      this.supprimerCollection(data);
    })
  }

  toggle() {
    this.isOpen=!this.isOpen;
  }
  rechargeClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./collection'])
  }
  onChangeChange($event: any) {
    console.log($event)
    console.log($event.pageIndex)
    let startIndex=$event.pageIndex * $event.pageSize;
    let endIndex= startIndex + $event.pageSize;
    if(endIndex>this.listCollection.length){
      endIndex=this.listCollection.length;
    }
    this.pageSlice=this.listCollection.slice(startIndex, endIndex);
  }

  onChangeSelect(clientId:number, $event: any) {
    if($event.target.checked===true) {
      this.listId.push(clientId);
    } else {
      let index = this.listId.indexOf(clientId)
      console.log(index);
      if(index>-1) {
        this.listId.splice(index, 1);
      }
    }
    console.log(this.listId);

  }
  generatePDF() {
    var data = document.getElementById('tableClient');
    if(data!==null){
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('newPDF.pdf');

      });
    }
  }
}
