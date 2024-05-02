package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Absence;
import com.example.pointageperrsonnel.Entity.Agent;

import java.util.List;

public interface AbsenceService {
    List<Agent> ListeAgAbs();

    List<Absence> saveListAgenAb( int idMotif, List<Agent> agents);
}
