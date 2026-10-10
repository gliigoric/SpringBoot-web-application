import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Narudzbina } from '../models/narudzbina';
import { Dodaci } from '../models/dodaci';

@Injectable({
  providedIn: 'root',
})
export class Narucivanje {
  private http = inject(HttpClient)

  login(korisnicko_ime: String, password: string, option: string) {
    let tip = "kupac"
    if(option != "") tip = "radnik"
    const data = {
      korisnicko_ime : korisnicko_ime,
      lozinka : password,
      tip
    }

    return this.http.post<Korisnik>("http://localhost:8080/login", data);
  }

  getAllNarudzbine() {
      return this.http.get<Narudzbina[]>("http://localhost:8080/getNarudzbine")
  }

  prihvati(n : Narudzbina){
    const data = {
      id : n.id
    }
    //alert(JSON.stringify(data));
    return this.http.post<Narudzbina>("http://localhost:8080/prihvati", data)
  }

  odbij(num: any) {
    const data = {
      id : num
    }
    return this.http.post<Narudzbina>("http://localhost:8080/odbij", data);
  }

  getSlane(){
    return this.http.get<Dodaci[]>("http://localhost:8080/sslane");
  }
  getSlatke(){
    return this.http.get<Dodaci[]>("http://localhost:8080/sslatke");
  }

  obrisi(d : Dodaci){
    const data ={id:d.id}
    return this.http.post<Dodaci>("http://localhost:8080/obrisi", data);
  }

  nestasica(n : Dodaci){
    const data = {
      id: n.id
    }
    return this.http.post<Dodaci>("http://localhost:8080/nestasica", data);
  }

  dopuna(n : Dodaci){
    const data = {
      id: n.id
    }
    return this.http.post<Dodaci>("http://localhost:8080/dopuna", data);
  }

  dodajDodatak(naziv: String, tip : String){
    let _tip = "slatka"
    if(tip != ""){
      _tip = "slana"
    }
    const data = {
      naziv: naziv,
      tip: _tip
    }
    return this.http.post<Dodaci>("http://localhost:8080/dodajdodatak", data);
  }

  naruci(tip : String, dodaci : String, pohovana : boolean){
    const data = {
      korisnik: localStorage.getItem("kupac"),
      tip: tip,
      dodaci: dodaci.slice(1),
      pohovana: pohovana?1:0
    }
    //alert(JSON.stringify(data))
    
    return this.http.post<Narudzbina>("http://localhost:8080/naruci", data);
  }

  register(ime : String, prezime : String, email : String, korisnicko_ime : String, lozinka : String, tip : String){
    const data = {
      korisnicko_ime,
      lozinka,
      ime,
      prezime,
      email,
      tip
    }
    return this.http.post<Number>("http://localhost:8080/register", data);
  }
  
}
