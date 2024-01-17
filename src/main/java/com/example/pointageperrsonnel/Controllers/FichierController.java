package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Fichier;
import com.example.pointageperrsonnel.Repository.FichierRepository;
import com.example.pointageperrsonnel.Services.FichierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class FichierController {

    @Autowired
    private FichierService fichierService;

   @PostMapping(value = "/fileupload")
    public void uploadFile(@ModelAttribute Fichier fichier){
       fichierService.saveDataFromUploadFile(fichier.getFile());
    }

}
