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
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codeservice;
    private String numeroservice;
    private String nomservice;
    private String adresse;
    private String codeips;
    private String codepostal;
    private Date DateCreation;
    private String email;
    private String telephone;



    @JsonIgnore
    @OneToMany(mappedBy = "service", fetch=FetchType.LAZY)
    private Collection<TypeHoraire> typeHoraires;

    @JsonIgnore
    @OneToMany(mappedBy = "service", fetch=FetchType.LAZY)
    private Collection<Agent> agent;


    @OneToMany(mappedBy = "service", fetch=FetchType.LAZY)
    private Collection<User> users;

    @ManyToOne
    @JoinColumn(name="iddrp")
    private Drp drp;

    @ManyToOne
    @JoinColumn(name="idtypeservice")
    private TypeService typeService;
}
