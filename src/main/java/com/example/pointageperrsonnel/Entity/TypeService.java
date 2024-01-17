package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idtypeservice;
    private String libelle;

    @JsonIgnore
    @OneToMany(mappedBy = "typeService", fetch=FetchType.LAZY)
    private Collection<Service> services;
}

