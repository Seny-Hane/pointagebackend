package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.SuiviPointage;

import java.util.List;

public interface SuiviPointageService {
    //Affichage de tous les suivi
    List<SuiviPointage> getALLSuiviPointage();

   //Affichage en fonction de son identifiant
   SuiviPointage getSuiviPointageById(long id);

   //Sauvegarde de suivi pointage
    SuiviPointage saveSuiviPointage(SuiviPointage suiviPointage);
}
