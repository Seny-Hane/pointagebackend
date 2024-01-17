package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.SuiviPointage;
import com.example.pointageperrsonnel.Repository.SuiviPointageRepository;
import com.example.pointageperrsonnel.Services.SuiviPointageImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class SuiviPointageController {
    @Autowired
    private SuiviPointageImpl suiviPointageService;

    @Autowired
    private SuiviPointageRepository suiviPointageRepository;

    //Liste du suivi pointage
    @GetMapping(value = "/SuiviPointage")
    public List<SuiviPointage> getAllSuiviPointage(){
        return suiviPointageService.getALLSuiviPointage();
    }

    //Affichage en fonction de l'identifiant
    @GetMapping(value = "/SuiviPointage/{id}")
    public SuiviPointage getSuiviPointageById(@PathVariable long id){
        return suiviPointageService.getSuiviPointageById(id);
    }

    //Savegarder un suivi
    @PostMapping(value = "/saveSuiviPointage/")
    public  SuiviPointage saveSuiviPointage(@PathVariable SuiviPointage suiviPointage){
        return suiviPointageService.saveSuiviPointage(suiviPointage);
    }
}
