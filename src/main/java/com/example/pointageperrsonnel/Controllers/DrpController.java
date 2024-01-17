package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Drp;
import com.example.pointageperrsonnel.Repository.DrpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/drp")
public class DrpController {
    @Autowired
    private DrpRepository drpRepository;

    //Liste des drp
    @GetMapping(value = "/alldrp")
    public List<Drp> getAll(){
        return drpRepository.findAll();
    }
}
