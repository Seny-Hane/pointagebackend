package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;
import javafx.print.Collation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.DateTimeException;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;


public interface PointageRepository extends JpaRepository<Pointage, Integer> {
    //Filtrage des heures (pointage soir)
    //@Query("select p from Pointage p where p.agent=:agent and FORMAT( p.datepointage,'%d/%m/%Y')=:heurearrivee")
    @Query(value = "SELECT * FROM pointage WHERE  DATE_FORMAT(datepointage,'%d-%m-%Y')=DATE_FORMAT(NOW(),'%d-%m-%Y') AND idagent=:agent",nativeQuery = true)
    Pointage findBydatepointageAndAgent(int agent);

    //Pointage findByDatepointageAndAgent(Date datepointage, Agent agent);

    //Liste poinatage en fonction de la date
    //@Query(value = "SELECT * FROM pointage WHERE  DATE_FORMAT(datepointage,'%d-%m-%Y')=DATE_FORMAT(datepointage,'%d-%m-%Y')",nativeQuery = true)
    //@Query("select d from pointage d where function('DATE_FORMAT',d.datepointage,'%d-%m-%Y')=:DATE_FORMAT(datepointage,'%d-%m-%Y')")
    List<Pointage> findByDatepointage(Date datepointage);
    /*@Query("select d from Pointage d where d.datepointage=:datepointage")
    List<Pointage> findByDatepointage(@Param("datepointage") Date datepointage);*/

    //Liste pointage par agent et service
    @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2) AND p.agent.idagent=:idagent AND p.agent.service.codeservice=:codeservice")
    List<Pointage> findByDatesIntervalle(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("idagent") int idagent, @Param("codeservice") int codeservice);

    //Liste de presence perriodique par agent par service
    @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2) AND p.agent.idagent=:idagent AND p.agent.service.codeservice=:codeservice AND p.motif.idmotif=1")
    List<Pointage> findByIntervalleDatesAgentPresent(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("idagent") int idagent, @Param("codeservice") int codeservice);

    //Liste presence en fonction d'une date par service
    @Query("SELECT p FROM Pointage p WHERE p.datepointage=:datepointage AND p.agent.service.codeservice=:codeservice AND p.motif.idmotif=1")
    List<Pointage> findByPresenceDatepointage(@Param("datepointage") Date datepointage, @Param("codeservice") int codeservice);

    //Liste de retard perriodique par agent d'un service service
    @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2) AND p.agent.idagent=:idagent AND p.agent.service.codeservice=:codeservice AND p.motif.idmotif=2")
    List<Pointage> findByIntervalleDatesAgentRetard(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("idagent") int idagent, @Param("codeservice") int codeservice);

    //Liste retard en fonction d'une date par service
    @Query("SELECT p FROM Pointage p WHERE p.datepointage=:datepointage AND p.agent.service.codeservice=:codeservice AND p.motif.idmotif=2")
    List<Pointage> findByAbsenceDatepointage(@Param("datepointage") Date datepointage, @Param("codeservice") int codeservice);

    //Liste des pointage perriodique par service en affichant tous les agents de la service
    @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2) AND p.agent.service.codeservice=:codeservice")
     List<Pointage> findAllPointageByDatesIntervalle(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("codeservice") int codeservice);

    //Liste des pointages perriodiques global
    @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2)")
    List<Pointage> findAllPointage(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2);

    /*//Liste des agnts n'ayant pas pointe par service
    @Query("SELECT p FROM Pointage p WHERE p.agent.idagent NOT IN (SELECT a.idagent FROM Agent a) AND p.agent.service.codeservice=:codeservice")
    List<Pointage> findAgents(@Param("codeservice") int codeservice);*/

    //Liste pointage en fonction d'une date pour les absents
    @Query("SELECT p FROM Pointage p WHERE p.datepointage=:datepointage")
    List<Pointage> listPointage(@Param("datepointage") Date datepointage);

   //Liste pointage perriodique pour les absents
   @Query("SELECT p FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2)")
   List<Pointage> listPointageDatesIntervalle(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2);

    //Les agents n'ayant pas pointes par service en fonction d'une date
    @Query(value ="SELECT * FROM agent WHERE codeservice=:codeservice AND (idagent NOT IN (SELECT idagent FROM pointage WHERE datepointage=:datepointage))", nativeQuery = true)
    List<Agent> listAgentsParserv(@Param("codeservice") int codeservice, @Param("datepointage") Date datepointage);


    //Verification pointage
    @Query(value = "SELECT * FROM pointage WHERE  DATE_FORMAT(datepointage,'%d-%m-%Y')=DATE_FORMAT(NOW(),'%d-%m-%Y') AND idagent=:agent",nativeQuery = true)
    Pointage findBypointages(int agent);

    //Verification mise a jour du update de la descente
    @Query(value = "SELECT * FROM pointage WHERE  DATE_FORMAT(datepointage,'%d-%m-%Y')=DATE_FORMAT(NOW(),'%d-%m-%Y') AND idagent=:agent AND  ISNULL(heuredescente) ",nativeQuery = true)
    Pointage findByHeuredescente(int agent);

    //Cumulheure global par agent
    @Query(value = "SELECT new Pointage(p.agent,SUM(p.cumulheure)) FROM Pointage p WHERE p.datepointage BETWEEN :datepointage1 AND :datepointage2 AND p.agent.matricule=:matricule AND p.agent.service.codeservice=:codeservice GROUP BY p.agent")
    Collection<Pointage> getCumulheure(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("matricule") String matricule, @Param("codeservice") int codeservice);

    //Recuperation de  l'heure du systeme
    @Query(value = "SELECT DATE_FORMAT(NOW(),'%H')",nativeQuery = true)
    int systeme();

    //Liste pointage en fonction du matricule
    @Query("SELECT p FROM Pointage p WHERE p.datepointage BETWEEN :datepointage1 AND :datepointage2 AND p.agent.matricule=:matricule")
    List<Pointage> listPointageAgent(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("matricule") String matricule );
}
