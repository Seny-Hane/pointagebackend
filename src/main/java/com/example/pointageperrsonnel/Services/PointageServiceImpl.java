package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;
import com.example.pointageperrsonnel.Repository.PointageRepository;
import javafx.print.Collation;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PointageServiceImpl implements PointageService{

    @Autowired
    private PointageRepository pointageRepository;
    @Autowired
    private AgentService agentService;

    @Override
    public List<Pointage> findByDatesIntervalle(Date datepointage1, Date datepointage2, int idagent, int codeservice){
        return pointageRepository.findByDatesIntervalle(datepointage1, datepointage2, idagent, codeservice);
    }

    @Override
    public List<Pointage> findByInvervalleDatesAgentPresent(Date datepointage1, Date datepointage2, int idagent, int codeservice) {
      return  pointageRepository.findByIntervalleDatesAgentPresent(datepointage1, datepointage2, idagent, codeservice);

    }

    @Override
    public List<Pointage> findByPresenceDatepointage(Date datepointage, int codeservice){
        return pointageRepository.findByPresenceDatepointage(datepointage, codeservice);
    }

    @Override
    public List<Pointage> findByInvervalleDatesAgentRetard(Date datepointage1, Date datepointage2, int idagent, int codeservice) {
        return  pointageRepository.findByIntervalleDatesAgentRetard(datepointage1, datepointage2, idagent, codeservice);

    }

    @Override
    public List<Pointage> findByAbsenceDatepointage(Date datepointage, int codeservice){
        return pointageRepository.findByAbsenceDatepointage(datepointage, codeservice);
    }

    @Override
    public List<Pointage> findAllPointageByDatesIntervalle(Date datepointage1, Date datepointage2, int codeservice){
        return pointageRepository.findAllPointageByDatesIntervalle(datepointage1, datepointage2, codeservice);
    }

    //Liste pointage en fonction d'une date pour les absents
    @Override
    public List<Pointage> listPointage(Date datepointage){
        return pointageRepository.listPointage(datepointage);
    }

    //liste pointage perriodique pour les absents
    @Override
    public List<Pointage> listPointageDatesIntervalle(Date datepointage1, Date datepointage2){
        return pointageRepository.listPointageDatesIntervalle(datepointage1, datepointage2);
    }

   //Les agents n'ayant pas pointes
    @Override
    public  List<Agent> listAgentsParserv(int codeservice, Date datepointage){
        return pointageRepository.listAgentsParserv(codeservice,datepointage);
    }

    //Verification pointage
    @Override
    public boolean findBypointages(int agent) {
        boolean poursuivre;
        if (pointageRepository.findBypointages(agent)!=null){
            poursuivre=false;//L'enregistrement ne pouura pas etre effectuer parce que l'agent a deja pointee
        }else {
            poursuivre=true;//L'enregistrement est possible, l'agent n'a pas encore pointe
        }

        return poursuivre;
    }

    @Override
    public boolean findByHeuredescente(int agent) {
        boolean poursuivre;
        if(pointageRepository.findByHeuredescente(agent)!=null){
            poursuivre=true;//La mise a jour sera effectuee
        }else{
            poursuivre=false;//La mise a jour a deja ete effecutee
        }
        return poursuivre;
    }

    @Override
    public List<Pointage> findAllPointage(Date datepointage1, Date datepointage2) {
        return pointageRepository.findAllPointage(datepointage1,datepointage2);
    }

    @Override
    public Collection<Pointage> getCumulheure(Date datepointage1, Date datepointage2, String matricule, int codeservice) {
        return pointageRepository.getCumulheure(datepointage1, datepointage2, matricule, codeservice);
    }

    @Override
    public List<Pointage> listPointageAgent(Date datepointage1, Date datepointage2, String matricule) {
        //if(agentService.verifierExistanceMatricule(matricule)){

            return pointageRepository.listPointageAgent(datepointage1,datepointage2,matricule);
        //}else {
           // System.out.println("Not exist");
            //return null;
        //}


    }
}
