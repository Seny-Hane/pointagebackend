
package com.example.pointageperrsonnel.Repository;

import com.example.pointageperrsonnel.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    //Afficher user en fonction du mail
    @Query("select u from User u where u.email=:email")
    User findByEmail(@PathVariable String email);

    @Query(value = "select u from User u where u.service.codeservice=:serviveCodeservice")
    public List<User> findByService(@Param("serviveCodeservice") int serviveCodeservice);

    /*@Query(value = "select u from User u where u.service.codeservice=:serviceCodeservice")
    User findByCodeService(@Param("serviceCodeservice") int serviceCodeservice);*/
//
//    @Query(value = "SELECT * FROM user WHERE id=:iduser", nativeQuery = true)
//    User findUserById(Long userId);
//

    // User findById(Long userId);

    // void delete(Long iduser);

 //   User findById(Long userId);
}

