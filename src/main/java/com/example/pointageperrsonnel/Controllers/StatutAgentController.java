package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.StatutAgent;
import com.example.pointageperrsonnel.Repository.StatutAgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/statut")
public class StatutAgentController {
    @Autowired
    private StatutAgentRepository statutAgentRepository;

    //Créer statut
    @PostMapping(value = "/savestatut")
    public StatutAgent save(@RequestBody StatutAgent statutAgent){
        return statutAgentRepository.save(statutAgent);
    }

    //Afficher en fonction de id
    @GetMapping(value = "/{idstatut}")
    public Optional<StatutAgent> StatutAgent(@PathVariable int idstatut){
         return statutAgentRepository.findById(idstatut);
    }

    //Modifier statut
    @PutMapping(value = "/editstatut/{idstatut}")
    public StatutAgent updateStatutAgent(@PathVariable int idstatut, @RequestBody StatutAgent statutAgent){
         statutAgent.setIdstatut(idstatut);
         return  statutAgentRepository.save(statutAgent);
    }

    //Afficher liste statut
     @GetMapping(value = "/allstatut")
    public List<StatutAgent> getAll() {
         return statutAgentRepository.findAll();
     }

    //Supprimer
    @DeleteMapping(value = "/deletestatut/{idstatut}")
    public void deleteStatut(@PathVariable int idstatut){
         statutAgentRepository.deleteById(idstatut);
    }

}
