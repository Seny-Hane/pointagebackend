package com.example.pointageperrsonnel.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fichier")
public class Fichier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idagent", nullable = false)
    private int idagent;

    @Column(name = "matricule")
    private String matricule;

    @Column(name = "nbr_ligne")
    private int nbrLigne;

    @Column(name = "prenomagent")
    private String prenomagent;

    @Column(name = "nomagent")
    private String nomagent;

    @Column(name = "genre")
    private String genre;

    @Column(name = "datenaissance")
    private String datenaissance;

    @Column(name = "lieuNaissance")
    private String lieuNaissance;

    @Column(name = "daterecrutement")
    private String daterecrutement;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "email")
    private String email;

    @Column(name = "version")
    private int version;

    @Column(name = "ccPpal")
    private String ccPpal;

    @Column(name = "cni")
    private String cni;

    @Column(name = "direction")
    private String direction;

    @Column(name = "echelon")
    private String echelon;

    @Column(name = "niveau")
    private String niveau;

    @Column(name = "reference")
    private String reference;

    @Column(name = "photo")
    private String photo;

    @Column(name = "photocni")
    private String photocni;

    @Column(name = "cniVerso")
    private String cniVerso;

    @Column(name = "services")
    private String services;

    private String fileName;

    @Transient
    private MultipartFile file;

    public Fichier(int idagent, String matricule, int nbrLigne, String prenomagent, String nomagent, String genre, String datenaissance, String lieuNaissance, String daterecrutement, String telephone, String adresse, String email, int version, String ccPpal, String cni, String direction, String echelon, String niveau, String reference, String photo, String photocni, String cniVerso, String services, String fileName) {
        this.idagent = idagent;
        this.matricule = matricule;
        this.nbrLigne = nbrLigne;
        this.prenomagent = prenomagent;
        this.nomagent = nomagent;
        this.genre = genre;
        this.datenaissance = datenaissance;
        this.lieuNaissance = lieuNaissance;
        this.daterecrutement = daterecrutement;
        this.telephone = telephone;
        this.adresse = adresse;
        this.email = email;
        this.version = version;
        this.ccPpal = ccPpal;
        this.cni = cni;
        this.direction = direction;
        this.echelon = echelon;
        this.niveau = niveau;
        this.reference = reference;
        this.photo = photo;
        this.photocni = photocni;
        this.cniVerso = cniVerso;
        this.services = services;
        this.fileName = fileName;


    }
}
