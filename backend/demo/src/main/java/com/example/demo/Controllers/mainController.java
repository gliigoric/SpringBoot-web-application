package com.example.demo.Controllers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.db;
import com.example.demo.Models.Dodaci;
import com.example.demo.Models.Narudzbina;
import com.example.demo.Models.korisnik;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class mainController {

    private final PasswordEncoder passwordEncoder;

    public mainController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public korisnik login(@RequestBody korisnik k) {
         try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM palacinkarnica2026.korisnici WHERE korisnicko_ime = ? AND tip = ?");
        ){
            ps.setString(1, k.getKorisnicko_ime());
            ps.setString(2, k.getTip());
            ResultSet rs = ps.executeQuery();
            if(rs.next() && passwordEncoder.matches(k.getLozinka(), rs.getString("lozinka"))){
                return new korisnik(rs.getString("korisnicko_ime"),
                "",
                rs.getString("ime"),
                rs.getString("prezime"),
                rs.getString("tip"));
            }
        }catch(SQLException e){ return null;}
        return null;
    }

    @GetMapping("/getNarudzbine")
    public List<Narudzbina> getAllNarudzbinas() {
        List<Narudzbina> narudzbine = new ArrayList<Narudzbina>();
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM palacinkarnica2026.narudzbine");
        ){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                narudzbine.add(new Narudzbina(rs.getInt("id"), rs.getString("korisnik"),
                rs.getString("tip"),rs.getString("dodaci"),rs.getInt("pohovana"),
                rs.getString("status")));
            }
            return narudzbine;
        }catch(SQLException e){ return null;}
    }
    
    @PostMapping("/prihvati")
    public int prihvati(@RequestBody Narudzbina n) {
        System.out.println("PRIHVATI!");
        //System.out.println("usao" + n);
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("UPDATE palacinkarnica2026.narudzbine SET status = 'prihvacena' WHERE id = ?");
        ){
            ps.setInt(1, n.getId());
            return ps.executeUpdate();
        }catch(SQLException e){
            System.out.println("EXCEPTION: " + e);
            return -1;
        }
    }

    @PostMapping("/odbij")
    public int odbij(@RequestBody Narudzbina n) {
        System.out.println("usao" + n.getId());
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("UPDATE palacinkarnica2026.narudzbine SET status = 'odbijena' WHERE id = ?");
        ){
            ps.setInt(1, n.getId());
            return ps.executeUpdate();
        }catch(SQLException e){
            System.out.println(e);
        }
        return -1;
    }

    @GetMapping("/sslane")
    public List<Dodaci> getSlane() {
        List<Dodaci> dodaci = new ArrayList<Dodaci>();
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM palacinkarnica2026.dodaci WHERE tip = 'slana'");
        ){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                //System.out.println(rs.getInt("id"));
                dodaci.add(new Dodaci(rs.getInt("id"), rs.getString("tip"), rs.getString("naziv"),
                rs.getInt("na_zalihama")));
            }
            return dodaci;
        }catch(SQLException e){ return null;}
    }

    @GetMapping("/sslatke")
    public List<Dodaci> getSlatke() {
        List<Dodaci> dodaci = new ArrayList<Dodaci>();
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM palacinkarnica2026.dodaci WHERE tip = 'slatka'");
        ){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
               dodaci.add(new Dodaci(rs.getInt("id"), rs.getString("tip"), rs.getString("naziv"),
                rs.getInt("na_zalihama")));
            }
            return dodaci;
        }catch(SQLException e){ return null;}
    }

    @PostMapping("/obrisi")
    public void obrisi(@RequestBody Dodaci d) {
        System.out.println("usao u obrisi!");
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("DELETE FROM palacinkarnica2026.dodaci WHERE id = ?");
        ){
            ps.setInt(1, d.getId());
            ps.executeUpdate();
        }catch(SQLException e){}
    }

    @PostMapping("/nestasica")
    public void nestasica(@RequestBody Dodaci d) {
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("UPDATE palacinkarnica2026.dodaci SET na_zalihama = 0 WHERE id = ?");
        ){
            ps.setInt(1, d.getId());
            ps.executeUpdate();
        }catch(SQLException e){}
    }

    @PostMapping("/dopuna")
    public void dopuna(@RequestBody Dodaci d) {
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("UPDATE palacinkarnica2026.dodaci SET na_zalihama = 1 WHERE id = ?");
        ){
            ps.setInt(1, d.getId());
            ps.executeUpdate();
        }catch(SQLException e){}
    }

    @PostMapping("/dodajdodatak")
    public void dodajDodatak(@RequestBody Dodaci d) {
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("INSERT INTO palacinkarnica2026.dodaci(tip, naziv, na_zalihama) VALUES(?, ?, 1)");
        ){
            ps.setString(1, d.getTip());
            ps.setString(2, d.getNaziv());
            ps.executeUpdate();
        }catch(SQLException e){}
    }

    @PostMapping("/naruci")
    public void naruci(@RequestBody Narudzbina n) {
        System.out.println("NARUCI");
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("INSERT INTO palacinkarnica2026.narudzbine(korisnik, tip, dodaci, pohovana, status) VALUES(?, ?, ?, ?, 'nova')");
        ){
            System.out.println(n.getKorisnik()+ '\n');
            System.out.println(n.getDodaci()+ '\n');
            System.out.println(n.getPohovana()+ '\n');
            System.out.println(n.getTip()+ '\n');
            ps.setString(1, n.getKorisnik());
            ps.setString(2, n.getTip());
            ps.setString(3, n.getDodaci());
            ps.setInt(4, n.getPohovana());
            System.out.println(ps.executeUpdate());
        }catch(SQLException e){
            System.out.println(e);
        }
    }

    @PostMapping("/register")
    public Number register(@RequestBody korisnik k) {
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM palacinkarnica2026.korisnici WHERE korisnicko_ime = ?");
        ){
            ps.setString(1, k.getKorisnicko_ime());
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                return -2;
            }

        }catch(SQLException e){
            System.out.println(e);
            return -1;
        }
        
        try(
            Connection conn = db.source().getConnection();
            PreparedStatement ps = conn.prepareStatement("INSERT INTO palacinkarnica2026.korisnici(korisnicko_ime, lozinka, ime, prezime, email, tip) VALUES(?, ?, ?, ?, ?, ?)");
        ){
            ps.setString(1, k.getKorisnicko_ime());
            ps.setString(2, passwordEncoder.encode(k.getLozinka()));
            ps.setString(3, k.getIme());
            ps.setString(4, k.getPrezime());
            ps.setString(5, k.getEmail());
            ps.setString(6, k.getTip());
            return ps.executeUpdate();
        }catch(SQLException e){
            System.out.println(e);
            return -1;
        }
    }
    
    
    
}
