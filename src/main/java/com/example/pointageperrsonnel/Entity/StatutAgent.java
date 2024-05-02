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
public class StatutAgent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idstatut;
    private String description;
/*
    @JsonIgnore
    @OneToMany(mappedBy = "statutAgent", fetch=FetchType.LAZY)
    private Collection<Agent> agent;*/

}
