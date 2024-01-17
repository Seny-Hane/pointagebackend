package com.example.pointageperrsonnel.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentDTO {
    private String matricule;
    private String prenomagent;
    private String nomagent;
    private String genre;
    private Date datenaissance;
    private Date  dateabsence;
}
