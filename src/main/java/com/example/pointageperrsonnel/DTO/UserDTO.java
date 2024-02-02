package com.example.pointageperrsonnel.DTO;

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
    private ServiceDTO serviceDTO;
    private RoleDTO roleDTO;
}
