package com.example.demo.Models;

public class Narudzbina {
    private Integer id;
    private String korisnik;
    private String tip;
    private String dodaci;
    private int pohovana;
    private String status;
    public Narudzbina() {
    }
    public Narudzbina(Integer id, String korisnik, String tip, String dodaci, int pohovana, String status) {
        this.id = id;
        this.korisnik = korisnik;
        this.tip = tip;
        this.dodaci = dodaci;
        this.pohovana = pohovana;
        this.status = status;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getKorisnik() {
        return korisnik;
    }
    public void setKorisnik(String korisnik) {
        this.korisnik = korisnik;
    }
    public String getTip() {
        return tip;
    }
    public void setTip(String tip) {
        this.tip = tip;
    }
    public String getDodaci() {
        return dodaci;
    }
    public void setDodaci(String dodaci) {
        this.dodaci = dodaci;
    }
    public int getPohovana() {
        return pohovana;
    }
    public void setPohovana(int pohovana) {
        this.pohovana = pohovana;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    
}
