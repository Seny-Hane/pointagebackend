package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Pointage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.pointageperrsonnel.Entity.Service;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface AgentRepository extends JpaRepository<Agent, Integer> {
    //Affichage agent en fonction de son matricule
   @Query("select a from Agent a where a.matricule=:matricule")
    Agent findAgentByMatricule(@Param("matricule") String matricule);

    //Affichage agents en fonction numero service
    List<Agent> findAgentByService(Service service);

    Agent findByFileName(String fileName);

    @Query(value = "select a from Agent a where a.service.codeservice=:serviceCodeservice")
    Agent findByCodeService(@Param("serviceCodeservice") int serviceCodeservice);

    //Liste des agent n'ayant pas pointe par service
  @Query(value= "SELECT a FROM Agent a WHERE a.idagent NOT IN (SELECT p.agent.idagent FROM Pointage p WHERE (p.datepointage BETWEEN :datepointage1 AND :datepointage2) OR p.datepointage = :datepointage1 )  AND a.service.codeservice=:codeservice")
  //@Query(value="SELECT * FROM `agent` WHERE idagent NOT IN (SELECT idagent FROM pointage WHERE datepointage BETWEEN :datepointage1 AND :datepointage2 )", nativeQuery = true)
    List<Agent> findAgents( @Param("datepointage1") LocalDate datepointage1, @Param("datepointage2") LocalDate datepointage2,@Param("codeservice") int codeservice);



    //Liste des agent n'ayant pas pointe par service
    // @Query(value = "SELECT * FROM agent WHERE idagent NOT IN (SELECT idagent FROM pointage WHERE pointage.datepointage=datepointage) AND agent.codeservice=codeservice", nativeQuery = true)
     @Query(value ="SELECT * FROM agent WHERE codeservice=:codeservice AND (idagent NOT IN (SELECT idagent FROM pointage WHERE datepointage=:datepointage))", nativeQuery = true)
  // @Query(value = "SELECT a FROM Agent a WHERE a.idagent  NOT IN (SELECT p.agent.idagent FROM Pointage p WHERE p.datepointage LIKE  CONCAT('%',:datepointage,'%')  AND a.service.codeservice=:codeservice)", nativeQuery = true)
    List<Agent> findList (@Param("codeservice") int codeservice,@Param("datepointage") LocalDate datepointage);

    //Liste agents par service en fonction du code service
    @Query("SELECT a FROM Agent a WHERE  a.service.codeservice=:codeservice")
    List<Agent> listAgents(@Param("codeservice") int codeservice);

    //Verification d'existence agent
    @Query("select ag from Agent ag where ag.matricule=:matricule")
    Optional<Agent> findByMatriculeVerif(String matricule);


 //Liste des agent n'ayant pas pointe par service
// @Query("SELECT a FROM Agent a WHERE a.idagent NOT IN (SELECT p.agent.idagent FROM Pointage p ) AND a.service.codeservice=:codeservice")
// List<Agent> findAgentsAbs(@Param("codeservice") int codeservice);
//

    @Query("SELECT a FROM Agent a WHERE  a.statut_presence like '%ABSENT' ")
    List<Agent> listAgentsAbsent();

}
