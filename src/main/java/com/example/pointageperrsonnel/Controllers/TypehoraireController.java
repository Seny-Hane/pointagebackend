package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.TypeHoraire;
import com.example.pointageperrsonnel.Repository.TypehoraireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/typehoraire")
public class TypehoraireController {
    @Autowired
    private TypehoraireRepository typehoraireRepository;

    //Affichage typehoraire
    @GetMapping(value = "/alltypehoraire")
    public List<TypeHoraire> getAll(){
        return typehoraireRepository.findAll();
    }

    //Creation typehoraire
    @PostMapping(value = "/savetypehoraire")
    public TypeHoraire save(@PathVariable TypeHoraire typeHoraire){
       return typehoraireRepository.save(typeHoraire);
    }

    //Affichage en fonction de son id
    @GetMapping(value = "/{codetypehoraire}")
    public Optional<TypeHoraire> typeHoraire(@PathVariable int codetypehoraire){
        return typehoraireRepository.findById(codetypehoraire);
    }

    //Modification typehoraire
    @PutMapping(value = "/edittypehoraire/{codetypehoraire}")
    public TypeHoraire updateTypehoraire(@PathVariable int codetypehoraire, @RequestBody TypeHoraire typeHoraire){
        typeHoraire.setCodetypehoraire(codetypehoraire);
        return typehoraireRepository.save(typeHoraire);
    }

    //Suppression
    @DeleteMapping(value = "/deletetypehoraire/{codetypehoraire}")
    public void deleteTypehoraire(@PathVariable int codetypehoraire){
        typehoraireRepository.deleteById(codetypehoraire);
    }
}
