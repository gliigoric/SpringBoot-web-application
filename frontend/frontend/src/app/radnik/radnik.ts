import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Narudzbina } from '../models/narudzbina';
import { Narucivanje } from '../services/narucivanje';
import { Dodaci } from '../models/dodaci';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radnik',
  imports: [FormsModule],
  templateUrl: './radnik.html',
  styleUrl: './radnik.css',
})
export class Radnik implements OnInit {
  private router = inject(Router)
  private narucivanje = inject(Narucivanje)
  sveNarudzbine : Narudzbina[] = []
  dodaciSlane : Dodaci[] = []
  dodaciSlatke : Dodaci[] = []
  i : number = 0;
  noviDodatak = ""
  tipDodatka = ""
  ime = ""
  prezime = ""
  email = ""
  korisnicko_ime = ""
  password = ""
  message = ""
  radnik = localStorage.getItem("ulogovanUsername")

  ngOnInit(): void {
    this.narucivanje.getAllNarudzbine().subscribe(data=>{
      //alert(JSON.stringify(data))
      this.sveNarudzbine = data;
    })

    this.narucivanje.getSlane().subscribe(data=>{
      this.dodaciSlane = data;
      //alert(JSON.stringify(data));
    })

    this.narucivanje.getSlatke().subscribe(data=>{
      this.dodaciSlatke = data;
      //alert(data);
    })
  }

  prihvati(n : Narudzbina){
    //alert(JSON.stringify(n))
    this.narucivanje.prihvati(n).subscribe(data=>{
      /*this.narucivanje.getAllNarudzbine().subscribe(data=>{
      alert(JSON.stringify(data))
      this.sveNarudzbine = data;
    })*/
    this.ngOnInit()
    })
  }

  odbij(id: any){
    this.narucivanje.odbij(id).subscribe(()=>{
      this.narucivanje.getAllNarudzbine().subscribe(data=>{
      //alert(JSON.stringify(data))
      this.sveNarudzbine = data;
    })
    })
  }

  obrisi(d : Dodaci){
    this.narucivanje.obrisi(d).subscribe(data=>{
      this.narucivanje.getSlane().subscribe(data=>{
      this.dodaciSlane = data;
      //alert(JSON.stringify(data));
    })
    this.narucivanje.getSlatke().subscribe(data=>{
      this.dodaciSlatke = data;
      //alert(data);
    })
    });
  }

  nestasica(n : Dodaci){
    this.narucivanje.nestasica(n).subscribe(data=>{
      this.narucivanje.getSlane().subscribe(data=>{
        this.dodaciSlane = data;
        //alert(JSON.stringify(data));
      })
      this.narucivanje.getSlatke().subscribe(data=>{
        this.dodaciSlatke = data;
        //alert(data);
      })
    })
  }

  dopuna(n : Dodaci){
    this.narucivanje.dopuna(n).subscribe(data=>{
      this.narucivanje.getSlane().subscribe(data=>{
        this.dodaciSlane = data;
      })
      this.narucivanje.getSlatke().subscribe(data=>{
        this.dodaciSlatke = data;
      })
    })
  }

  dodajDodatak(){
    if(this.tipDodatka == ""){
      for(let i = 0; i < this.dodaciSlatke.length; i++){
        if(this.dodaciSlatke[i].naziv == this.noviDodatak){
          alert("Dodatak vec postoji")
          return
        }
      }
    }else{
      for(let i = 0; i < this.dodaciSlane.length; i++){
        if(this.dodaciSlane[i].naziv == this.noviDodatak){
          alert("Dodatak vec postoji")
          return
        }
      }
    }
    this.narucivanje.dodajDodatak(this.noviDodatak, this.tipDodatka).subscribe(data=>{
      this.noviDodatak = ""
      if(this.tipDodatka == ""){
        this.narucivanje.getSlatke().subscribe(data=>{
          this.dodaciSlatke = data;
      })
      }else{
         this.narucivanje.getSlane().subscribe(data=>{
          this.dodaciSlane = data;
      })
      }
    })
  }

  register(){
    this.narucivanje.register(this.ime, this.prezime, this.email, this.korisnicko_ime, this.password, "radnik").subscribe(data=>{
      this.message = ""
      if(data==1){
        alert("Uspesno registrovan nalog!")
      }else{
        this.message = "Korisnicko ime je zauzeto!"
      }
    })
  }
}
