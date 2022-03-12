import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {VenteService} from "../vente.service";
import {Observable} from "rxjs";
import Vente from "../interface/Vente";
import {HttpClient} from "@angular/common/http";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {getTreeNoValidDataSourceError} from "@angular/cdk/tree";
import {PersonneService} from "../personne.service";

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit, OnChanges{
@Input() venteEnfantList:Vente[]=[];
public nomVendeur:string=""
  constructor(private venteService: VenteService, http: HttpClient, public servicePersonne:PersonneService) {
  }

  ngOnInit(): void {

  }
  generatePDFFacture() {
    var data = document.getElementById('facture');
    if(data!==null){
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight)
        pdf.save('newPDF.pdf');

      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {


  }

}
