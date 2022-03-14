import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserserviceService} from "./userservice.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
 public title = 'stock';
 public email:string="";

  constructor(public userSerVice:UserserviceService,private router:Router) {
  }


  ngOnInit(): void {

  this.email=""+localStorage.getItem("email");
  this.userSerVice.boolConnecterTest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.email=""+localStorage.getItem("email");
    this.userSerVice.boolConnecterTest();

  }
  rechargeClick() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./login'])
  }
}
