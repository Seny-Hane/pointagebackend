package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query(value = "select r from Role r where r.id=:id")
    public List<Role> getRoleByid(@Param("id") int id);
}
