package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.TypeService;
import com.example.pointageperrsonnel.Repository.TypeServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/typeservice")
public class TypeServiceController {
    @Autowired
    private TypeServiceRepository typeServiceRepository;

    //Liste des types
    @GetMapping(value = "/alltype")
    public List<TypeService> getAll(){
        return typeServiceRepository.findAll();
    }
}
