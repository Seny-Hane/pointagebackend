package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Indisponibilite;
import com.example.pointageperrsonnel.Repository.IndisponibiliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/indisponibilite")
public class IndisponibiliteController {
    @Autowired
    private IndisponibiliteRepository indisponibiliteRepository;

    //Affichage indisponibilite
    @GetMapping(value = "/allindisponibilite")
    public List<Indisponibilite> getAll(){
       return indisponibiliteRepository.findAll();
    }

    //Creation indiponibilite
    @PostMapping(value = "/saveindisponibilite")
    public Indisponibilite save(@RequestBody Indisponibilite indisponibilite){
        return indisponibiliteRepository.save(indisponibilite);
    }

    //Affichage en fonction de id
    @GetMapping(value = "/{idindisponibilite}")
    public Optional<Indisponibilite> indisponibilite(@PathVariable int idindisponibilite){
        return indisponibiliteRepository.findById(idindisponibilite);
    }

    //Modification indisponibilite
    @PutMapping(value = "/editindisponibilite/{idindisponibilite}")
    public Indisponibilite updateIndisponibilite(@PathVariable int idindisponibilite, @RequestBody Indisponibilite indisponibilite){
        indisponibilite.setIdindisponibilite(idindisponibilite);
        return indisponibiliteRepository.save(indisponibilite);
    }

    //suppression
    @DeleteMapping(value = "/deleteindisponibilite/{idindisponibilite}")
    public  void deleteIndisponibilite(@PathVariable int idindisponibilite){
        indisponibiliteRepository.deleteById(idindisponibilite);
    }
}
