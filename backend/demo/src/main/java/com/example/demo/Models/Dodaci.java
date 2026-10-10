package com.example.demo.Models;

public class Dodaci {
    private int id;
    private String tip;
    private String naziv;
    private int na_zalihama;
    public Dodaci() {
    }
    public Dodaci(int id, String tip, String naziv, int na_zalihama) {
        this.id = id;
        this.tip = tip;
        this.naziv = naziv;
        this.na_zalihama = na_zalihama;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTip() {
        return tip;
    }
    public void setTip(String tip) {
        this.tip = tip;
    }
    public String getNaziv() {
        return naziv;
    }
    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }
    public int getNa_zalihama() {
        return na_zalihama;
    }
    public void setNa_zalihama(int na_zalihama) {
        this.na_zalihama = na_zalihama;
    }

    
}
