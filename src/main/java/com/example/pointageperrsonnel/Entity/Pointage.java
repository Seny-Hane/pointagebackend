package com.example.pointageperrsonnel.Entity;

import com.example.pointageperrsonnel.Entity.enums.Statut_Presence;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter @ToString
public class Pointage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  idpointage;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private LocalDate datepointage;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "HH:mm")
    private Date heurearrivee;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "HH:mm")
    private Date heuredescente;
    private String cumulheure;
    @Enumerated(EnumType.STRING)
    private Statut_Presence statut_presence=Statut_Presence.PRESENT;


    /*@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "pointages")
    private Set<Agent> agents= new HashSet<>();*/

    @ManyToOne
    @JoinColumn(name="idagent")
    private Agent agent;


//    @ManyToOne
//    @JoinColumn(name="idmotif")
//    private Motif motif;

    public Pointage(Agent agent, String cumulheure) {

        this.agent = agent;
        this.cumulheure=cumulheure;
    }
}
