package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int iddrp;
    private String adresse;
    private Date DateCreation;
    private String email;
    private String libelle;
    private String telephone;

//    @JsonIgnore
//    @OneToMany(mappedBy = "drp", fetch=FetchType.LAZY)
//    private Collection<Service> services;
}
