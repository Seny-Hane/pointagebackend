package com.example.pointageperrsonnel.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter @ToString
public class Absence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //private LocalDate dateAbs=LocalDate.now();
    private Date dateAbs= new Date();
    private  String commentaire;

    @JsonIgnoreProperties({"service","typeService"})
    @ManyToOne
    @JoinColumn(name="idAgent")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name="idMotif")
    private Motif motif;


    @JsonIgnoreProperties({"drp","typeService"})
    @ManyToOne
    @JoinColumn(name="idService")
    private Service service;
}
