package com.example.pointageperrsonnel.DTO;

import lombok.Data;

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
}
