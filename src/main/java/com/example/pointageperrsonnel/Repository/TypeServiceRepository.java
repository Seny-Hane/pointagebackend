package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.TypeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeServiceRepository extends JpaRepository<TypeService,Integer> {
}
