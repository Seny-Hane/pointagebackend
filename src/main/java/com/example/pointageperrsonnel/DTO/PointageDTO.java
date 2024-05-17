package com.example.pointageperrsonnel.DTO;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.enums.Statut_Presence;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter @ToString
public class PointageDTO {

    private int  idpointage;
    private String datepointage;
    private String heurearrivee;
    private String heuredescente;
    private String cumulheure;
    @Enumerated(EnumType.STRING)
    private Statut_Presence statut_presence=Statut_Presence.PRESENT;


    @ManyToOne
    @JoinColumn(name="idagent")
    private Agent agent;


}
