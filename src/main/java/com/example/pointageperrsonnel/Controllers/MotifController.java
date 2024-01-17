package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Motif;
import com.example.pointageperrsonnel.Repository.MotifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/motif")
public class MotifController {
    @Autowired
    private MotifRepository motifRepository;

    //Affichage des motif
     @GetMapping(value = "/allmotif")
    public List<Motif> getAll() {
         return motifRepository.findAll();
     }

     //Crestion motif
    @PostMapping(value = "/savemotif")
    public Motif save(@RequestBody Motif motif){
       return motifRepository.save(motif);
    }

    //Affichage en fonction de son id
    @GetMapping(value = "/{idmotif}")
    public Optional<Motif> motif(@PathVariable int idmotif){
         return motifRepository.findById(idmotif);
    }

    //Affichage id en fonction du motif
    @GetMapping(value = "/{motif}")
    public Motif findMotifByMotif(@PathVariable String motif){
         return motifRepository.findMotifByMotif(motif);
    }
    //Modification motif
    @PutMapping(value = "/editmotif/{idmotif}")
    public Motif updateMotif(@PathVariable int idmotif, @RequestBody Motif motif){
         motif.setIdmotif(idmotif);
         return  motifRepository.save(motif);
    }

    //Suppression
    @DeleteMapping(value = "/deletemotif/{idmotif}")
    public void deleteMotif(@PathVariable int idmotif){
         motifRepository.deleteById(idmotif);
    }

}
