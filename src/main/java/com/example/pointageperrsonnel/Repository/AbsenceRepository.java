package com.example.pointageperrsonnel.Repository;


import com.example.pointageperrsonnel.Entity.Absence;
import com.example.pointageperrsonnel.Entity.Pointage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence,Long>{

    @Query("SELECT a FROM Absence a WHERE a.dateAbs BETWEEN :datepointage1 AND :datepointage2 AND a.agent.matricule=:matricule")
    List<Absence> listAbsenceByAgent(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("matricule") String matricule );

    @Query("SELECT a FROM Absence a WHERE a.dateAbs BETWEEN :datepointage1 AND :datepointage2 AND a.agent.service.codeservice=:codeservice")
    List<Absence> listAbsenceByInterDate(@Param("datepointage1") Date datepointage1, @Param("datepointage2") Date datepointage2, @Param("codeservice") int codeservice );


}
