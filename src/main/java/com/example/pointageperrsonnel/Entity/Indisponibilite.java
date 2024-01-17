package com.example.pointageperrsonnel.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Indisponibilite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idindisponibilite;
    private Date datedebut;
    private Date datefin;

    @ManyToOne
    @JoinColumn(name="idmotif")
    private Motif motif;

    @ManyToOne
    @JoinColumn(name="idagent")
    private Agent agent;
}
