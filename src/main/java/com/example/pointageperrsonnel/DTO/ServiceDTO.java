package com.example.pointageperrsonnel.DTO;

import com.example.pointageperrsonnel.Entity.User;
import lombok.Data;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.Collection;
import java.util.Date;

@Data
public class ServiceDTO {
    private int codeservice;
    private String numeroservice;
    private String nomservice;
    private String adresse;
    private String codeips;
    private String codepostal;
    private Date DateCreation;
    private String email;
    private String telephone;

    @OneToMany(mappedBy = "service")
    private Collection<UserDTO> user;
}
