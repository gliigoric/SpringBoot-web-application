package com.example.demo.Models;

public class korisnik {
    private String korisnicko_ime;
    private String lozinka;
    private String ime;
    private String prezime;
    private String email;
    private String tip;
    public korisnik() {
    }
    public korisnik(String korisnicko_ime, String lozinka, String ime, String prezime, String tip) {
        this.korisnicko_ime = korisnicko_ime;
        this.lozinka = lozinka;
        this.ime = ime;
        this.prezime = prezime;
        this.tip = tip;
    }
    public String getKorisnicko_ime() {
        return korisnicko_ime;
    }
    public void setKorisnicko_ime(String korisnicko_ime) {
        this.korisnicko_ime = korisnicko_ime;
    }
    public String getLozinka() {
        return lozinka;
    }
    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }
    public String getIme() {
        return ime;
    }
    public void setIme(String ime) {
        this.ime = ime;
    }
    public String getPrezime() {
        return prezime;
    }
    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String tip) {
        this.email = tip;
    }
    public String getTip() {
        return tip;
    }
    public void setTip(String tip) {
        this.tip = tip;
    }

    
}
