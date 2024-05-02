package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;

import java.util.Date;
import java.util.List;

public interface AgentService {
    //Sauvegarder des agents
    List<Agent> saveAgent(List<Agent> list);

    //Liste agent par service en fonction du codeservice
    List<Agent> listAgents(int codeservice);

    //Liste agents en fonction du matricule
    //boolean verifierExistanceMatricule(String matricule);

    List<Agent> findAllAgent();

    // liste agents absents periodique par service
    List<Agent> listAbsence(Date datepointage1, Date datepointage2,int codeservice);

}
