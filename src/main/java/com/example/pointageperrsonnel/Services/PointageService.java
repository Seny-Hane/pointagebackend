package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface PointageService {
    //Liste de pointage par agent d'un service
    List<Pointage> findByDatesIntervalle(Date datepointage1, Date datepointage2, int idagent, int codeservice);

    //Liste presence perriodique par agent et service
    List<Pointage> findByInvervalleDatesAgentPresent(Date datepointage1, Date datepointage2, int idagent, int codeservice);

    //Liste precence en fonction d'une date par service
    List<Pointage> findByPresenceDatepointage(Date datepointage, int codeservice);

    //Liste de retard perriodique par agent
    List<Pointage> findByInvervalleDatesAgentRetard(Date datepointage1, Date datepointage2, int idagent, int codeservice);

    //Liste retad en fonction d'une date par service
    List<Pointage> findByAbsenceDatepointage(Date datepointage, int codeservice);

    //Liste des pointages perriodique par service de tous les agents de la service
    List<Pointage> findAllPointageByDatesIntervalle(Date datepointage1, Date datepointage2, int codeservice);

    //Liste pointage
    List<Pointage> listPointage(Date datepointage);

    //Liste pointage perriodique pour les absents
    List<Pointage> listPointageDatesIntervalle(Date datepointage1, Date datepointage2);

    //Les agents n'ayant pas pointes par service
    List<Agent> listAgentsParserv(int codeservice, Date datepointage);

    //Verification pointage
    boolean findBypointages(int agent);

    //Verification mise a jour du update de la descente
    boolean findByHeuredescente(int agent);

    //Liste pointage perriodique global
    List<Pointage> findAllPointage(Date datepointage1, Date datepointage2);

    //Cumulheure global
     Collection<Pointage> getCumulheure(Date datepointage1, Date datepointage2, String matricule, int codeservice);

     //Liste pointage en fonction du matricule
    List<Pointage>listPointageAgent(Date datepointage1, Date datepointage2, String matricule);
}
