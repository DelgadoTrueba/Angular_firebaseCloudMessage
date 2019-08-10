import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  user;

  chele = "CHELE";
  isabel ="ISABEL";
  shena = "SHENA";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap) => {
      if(!paramMap.has("id")){
        return;
      }

      let id = paramMap.get("id");
      if(id === "1") this.user = this.chele;
      if(id === "2") this.user = this.isabel;
      if(id === "3") this.user = this.shena;

    });

  }

}
