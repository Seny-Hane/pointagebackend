package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
    //Affichage en fonction du numero de service
    @Query("select s from Service s where s.numeroservice=:numeroservice")
    Service findServicesByNumeroservice(@Param("numeroservice") String numeroservice);



}
