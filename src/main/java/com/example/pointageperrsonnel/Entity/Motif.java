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
public class Motif {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idmotif;
    private String motif;

    @JsonIgnore
    @OneToMany(mappedBy = "motif", fetch=FetchType.LAZY)
    private Collection<Indisponibilite> indisponibilites;

    @JsonIgnore
    @OneToMany(mappedBy = "motif", fetch=FetchType.LAZY)
    private Collection<Pointage> pointages;
}
