package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pointage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int  idpointage;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private Date datepointage;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "HH:mm")
    private Date heurearrivee;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "HH:mm")
    private Date heuredescente;
    private String cumulheure;

    /*@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "pointages")
    private Set<Agent> agents= new HashSet<>();*/

    @ManyToOne
    @JoinColumn(name="idagent")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name="idmotif")
    private Motif motif;

    public Pointage(Agent agent, String cumulheure) {

        this.agent = agent;
        this.cumulheure=cumulheure;
    }
}
