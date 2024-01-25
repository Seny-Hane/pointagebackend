package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idagent;
    @Column(unique = true)
    private String matricule;
    private String prenomagent;
    private String nomagent;
    private String genre;
    private Date datenaissance;
    //private String lieuNaissance;
    private Date daterecrutement;
    //private String telephone;
    //private String adresse;
    //private String email;
    //private int version;
    private String ccPpal;
    //private String cni;
    //private String direction;
    //private String echelon;
    //private String niveau;
    @Column(unique = true)
    private int reference;
   // private String photo;
    //private String photocni;
    //private String cniVerso;
    private String services;
    private Date premierjourtravail;
    private String fileName;

    @Transient
    private MultipartFile file;

    @JsonIgnore
    @OneToMany(mappedBy = "agent", fetch=FetchType.LAZY)
    private Collection<Indisponibilite> indisponibilites;

    @ManyToOne
    @JoinColumn(name="codeservice")
    private Service service;

    @ManyToOne
    @JoinColumn(name="idstatut")
    private StatutAgent statutAgent;

  /*  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "agent_pointage",
            joinColumns = {@JoinColumn(name = "idagent")},
            inverseJoinColumns = {@JoinColumn(name = "idpointage")}

            )
    private Set<Pointage> pointages= new HashSet<>();*/
    /*private String rapportjournalier;
    private String rapporthebdomadaire;
    private String rapportmensuel;*/

    @JsonIgnore
    @OneToMany(mappedBy = "agent", fetch=FetchType.LAZY)
    private Collection<Pointage> pointages;

    public Agent(int idagent, String matricule, String prenomagent, String nomagent, String genre, Date datenaissance, Date daterecrutement, String ccPpal, int reference, String services, String fileName, MultipartFile file, Service service) {
        this.idagent = idagent;
        this.matricule = matricule;
        this.prenomagent = prenomagent;
        this.nomagent = nomagent;
        this.genre = genre;
        this.datenaissance = datenaissance;
        this.daterecrutement = daterecrutement;
        this.ccPpal = ccPpal;
        this.reference = reference;
        this.services = services;
        this.fileName = fileName;
        this.file = file;
        //this.indisponibilites = indisponibilites;
        this.service = service;
        //this.pointages = pointages;
    }


}
