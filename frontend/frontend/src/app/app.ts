import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Narucivanje } from './services/narucivanje';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  korisnicko_ime = "";
  password = "";
  option = "";
  message = "";
  ime = ""
  prezime = ""
  email = ""
  _password = "";
  _korisnicko_ime = ""
  _message = ""
  logged = false
  showForm = true

  private narucivanje = inject(Narucivanje)
  private router = inject(Router)
  login(){
    this.narucivanje.login(this.korisnicko_ime, this.password, this.option).subscribe(data=>{
      //alert(JSON.stringify(data));
      if(data && data.tip == "kupac" && this.option == ""){
        this.message = ""
        localStorage.setItem("kupac", data.korisnicko_ime)
        this.showForm = false
        this.logged = true
        localStorage.setItem("ulogovanUsername", data.ime)
        localStorage.setItem('ulogovan', JSON.stringify(data));
        this.router.navigate(['/kupac'])
      }
      if(data && data.tip == "radnik" && this.option == "radnik"){
        this.message = ""
        this.showForm = false
        this.logged = true
        localStorage.setItem("ulogovanUsername", data.ime)
        localStorage.setItem('ulogovan', JSON.stringify(data));
        this.router.navigate(['/radnik'])
      }if(!data){
        this.message = "Netacni kredencijali!"
      }
    })
  }

  register(){
    this.narucivanje.register(this.ime, this.prezime, this.email, this._korisnicko_ime, this._password, "kupac").subscribe(data=>{
      this._message = ""
      if(data==1){
        alert("Uspesno registrovan nalog!")
      }else{
        this._message = "Korisnicko ime je zauzeto!"
      }
    })
  }

  logout(){
    localStorage.clear()
    window.location.href = '/'
  }
}
