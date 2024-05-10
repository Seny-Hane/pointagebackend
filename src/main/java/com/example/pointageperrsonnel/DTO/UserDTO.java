package com.example.pointageperrsonnel.DTO;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.Service;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;


@Data
public class UserDTO {
    private int id ;
    private String reference ;
    private String nom ;
    private String prenom;
    //private String password ;
    private String email;
    private String telephone ;
    private String matricule;
    private boolean isEnable;
    //private Service service;
  //  private List<String> roles;

    @JsonIgnoreProperties(value = {"Service"},allowSetters = true)
    @ManyToOne
    private Service service;

//    @JsonIgnoreProperties(value = {"Role"},allowSetters = true)
//    @ManyToOne
//    private Role role;
//


}
