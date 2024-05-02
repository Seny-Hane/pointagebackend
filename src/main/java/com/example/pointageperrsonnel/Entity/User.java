package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id ;
    @Column(unique = true)
    private String reference ;
    private String nom ;
    private String prenom;
   //private String password ;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String telephone ;
    @Column(unique = true)
    private String matricule;
    private boolean isEnable;

    /* @JsonIgnoreProperties(value={"users"},allowSetters = true)
    @ManyToMany
    @JoinTable( name = "Users_Roles_Associations",
            joinColumns = @JoinColumn( name = "id_user" ),
            inverseJoinColumns = @JoinColumn( name = "id_role" ) )
    private List<Role> roles = new ArrayList<>();*/

    // @JsonManagedReference
    @JsonIgnoreProperties(value = {"Service"},allowSetters = true)
    @ManyToOne
    private Service service;

//
//    @JsonIgnoreProperties(value = {"Role"},allowSetters = true)
//    @ManyToOne
//    private Role role;

}
