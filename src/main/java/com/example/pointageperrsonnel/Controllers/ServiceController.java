package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Agent;
import com.example.pointageperrsonnel.Entity.Service;
import com.example.pointageperrsonnel.Repository.AgentRepository;
import com.example.pointageperrsonnel.Repository.ServiceRepository;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/service")
public class ServiceController {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private AgentRepository agentRepository;

    //Affichage des services
    @GetMapping(value = "/allservice")
    public List<Service> getAll(){
        return serviceRepository.findAll();
    }

    //Creation services
    @PostMapping(value = "/saveservices")
    public Service save(@RequestBody Service service){
        return serviceRepository.save(service);
    }

    //Affichage en fonction de son id
    @GetMapping(value = "/{idservice}")
    public Optional<Service> service(@PathVariable int idservice){
        return serviceRepository.findById(idservice);
    }

    //Affichage en fonction du numero de service
    @GetMapping(value = "servicenumero/{numeroservice}")
    public Service findServicesByNumeroservice(@PathVariable String numeroservice){
        return serviceRepository.findServicesByNumeroservice(numeroservice);
    }


    //Affichage agents en fonction du nom service


    //Modification service
    @PutMapping(value = "/editservice/{codeservice}")
    public Service updateService(@PathVariable int codeservice, @RequestBody Service service){
        service.setCodeservice(codeservice);
        return serviceRepository.save(service);
    }

    //Suppression
    @DeleteMapping(value = "/deleteservice/{codeservice}")
    public void deleteService(@PathVariable int codeservice){
        serviceRepository.deleteById(codeservice);
    }
}
