import { Component, inject, OnInit } from '@angular/core';
import { Dodaci } from '../models/dodaci';
import { Router } from '@angular/router';
import { Narucivanje } from '../services/narucivanje';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kupac',
  imports: [FormsModule],
  templateUrl: './kupac.html',
  styleUrl: './kupac.css',
})
export class Kupac implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showComponent = -1
  pohovana = false
  kupac = localStorage.getItem("ulogovanUsername")
  tip = ""
  dodaci: Array<Dodaci> = []
  private router = inject(Router)
  private narucivanje = inject(Narucivanje)

  show(n : number){
    this.showComponent = n
    if(n == 0){
      this.tip = "slana"
      this.narucivanje.getSlane().subscribe(data=>{
        this.dodaci = data
      })
    }else if(n == 1){
      this.tip = "slatka"
      this.narucivanje.getSlatke().subscribe(data=>{
        this.dodaci = data
      })
    }else{
      this.tip = "prazna"
      this.dodaci = []
    }
  }

  naruci(){
    let izabrani = ""
    if(this.showComponent != 2){
      for(let i = 0; i < this.dodaci.length; i++){
        if(this.dodaci[i].izabran){
          izabrani = izabrani+','+this.dodaci[i].naziv
        }
      }
    }else izabrani = "/"

    this.narucivanje.naruci(this.tip, izabrani, this.pohovana).subscribe(data=>{
      alert("Narudzbina uspesno poslata!")
    })
  }
}
