package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Motif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MotifRepository extends JpaRepository<Motif, Integer> {
    //Le motif en recuperqnt son id
    @Query("select m from Motif m where m.motif=:motif")
    Motif findMotifByMotif(@Param("motif") String motif);


}
