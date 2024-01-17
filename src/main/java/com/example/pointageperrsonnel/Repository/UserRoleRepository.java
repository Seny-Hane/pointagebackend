package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

    @Query(value = "select r from UserRole r where (r.role.id=1 OR r.role.id=2)  " +
            "AND r.user.isEnable=true AND r.user.service.codeservice =:codeservice ")
    public List<UserRole> findUserRoleByRole(@Param("codeservice") int codeservice);

}
