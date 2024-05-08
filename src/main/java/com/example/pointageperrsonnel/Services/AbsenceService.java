package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Absence;
import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface AbsenceService {
    List<Agent> ListeAgAbs();

    List<Absence> saveListAgenAb( int idMotif, List<Agent> agents);

    List<Absence> findAllAbsenceByDatesIntervalle(Date datepointage1, Date datepointage2, String matricule);

}
