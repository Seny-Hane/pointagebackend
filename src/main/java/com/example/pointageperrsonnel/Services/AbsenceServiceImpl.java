package com.example.pointageperrsonnel.Services;


import com.example.pointageperrsonnel.Entity.Absence;
import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Motif;
import com.example.pointageperrsonnel.Repository.AbsenceRepository;
import com.example.pointageperrsonnel.Repository.AgentRepository;
import com.example.pointageperrsonnel.Repository.MotifRepository;
import com.example.pointageperrsonnel.Repository.ServiceRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@Transactional

public class AbsenceServiceImpl implements  AbsenceService{
    @Autowired
    AbsenceRepository absenceRepository;

    @Autowired
    AgentRepository agentRepository;

    @Autowired
    MotifRepository motifRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Override
    public List<Agent> ListeAgAbs() {
        List<Agent> agents = agentRepository.listAgentsAbsent();
        return  agents;

    }

    @Override
    public List<Absence> saveListAgenAb( int idMotif,List<Agent> agents) {
        int counter = 0;
        List<Absence> absences = new ArrayList<>();
        Motif motif = this.motifRepository.findById(idMotif).get();
     //  com.example.pointageperrsonnel.Entity.Service service = serviceRepository.findById(idService).get();
        for (Agent agent:agents){
             com.example.pointageperrsonnel.Entity.Service service = serviceRepository.findById(agent.getService().getCodeservice()).get();
            Absence absence= new Absence();
            absence.setAgent(agent);
            absence.setMotif(motif);
            absence.setService(service);
            absence.setCommentaire(absence.getCommentaire());
           // absence.setDateAbs(Date.);
            Absence saveabds = absenceRepository.save(absence);
            absences.add(saveabds) ;
        }
        return absences;
    }

    @Override
    public List<Absence> findAllAbsenceByDatesIntervalle(Date datepointage1, Date datepointage2,  String matricule) {
        return absenceRepository.listAbsenceByAgent(datepointage1, datepointage2, matricule);

    }
}
