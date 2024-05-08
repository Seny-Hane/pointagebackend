package com.example.pointageperrsonnel.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
public class AgentDTO {
    private String matricule;
    private String prenomagent;
    private String nomagent;
    private String genre;
    private Date datenaissance;
    private LocalDate dateabsence;
}
