package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichierRepository extends JpaRepository<Fichier,Integer> {
    public Fichier findByFileName(String filename);
}
