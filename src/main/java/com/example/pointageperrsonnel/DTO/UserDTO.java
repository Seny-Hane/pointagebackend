package com.example.pointageperrsonnel.DTO;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.Service;
import lombok.Data;


@Data
public class UserDTO {
    private int id ;
    private String reference ;
    private String nom ;
    private String prenom;
    private String password ;
    private String email;
    private String telephone ;
    private String matricule;
    private boolean isEnable;
    private int service;
    private int role;
}
