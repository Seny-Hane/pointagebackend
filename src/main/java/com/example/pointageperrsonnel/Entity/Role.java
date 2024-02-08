package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    @Column(unique = true)
    private String authority;
    private String description;

//    @JsonIgnoreProperties("roles")
//    @ManyToMany
//    @JoinTable( name = "Users_Roles_Associations",
//            joinColumns = @JoinColumn( name = "id_role" ),
//            inverseJoinColumns = @JoinColumn( name = "id_user" ) )
//
//    private List<User> users = new ArrayList<>();


}
