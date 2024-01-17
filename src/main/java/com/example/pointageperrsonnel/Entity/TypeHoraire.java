package com.example.pointageperrsonnel.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeHoraire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codetypehoraire;
    private int regimehorairehebdomadaire;
    private int regimehorairemensuel;

    @ManyToOne
    @JoinColumn(name="codeservice")
    private Service service;
}
