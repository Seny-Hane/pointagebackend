package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.RoleRepository;
import com.example.pointageperrsonnel.Services.RoleServiceImpl;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/role")
@CrossOrigin("*")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private KeycloakRestTemplate keycloakRestTemplate;

    @Autowired
    KeyCloakService keyCloakService;

    @GetMapping(value = "")
    public List<Role> getAllrole() {
        return roleRepository.findAll();
    }

    @GetMapping(value = "/all")
    public List<Role> getAllroles() {
        return roleService.getAllRoles();
    }

    @PostMapping(value = "")
    public Role saveRole(@RequestBody Role role) {
        return roleService.saverole(role);
    }

    @GetMapping(value = "/{id}")
    public List<Role> getRoleByIdRole(@PathVariable int id){
        return roleRepository. getRoleByid(id);
    }

    @GetMapping(value = "/get/{id}")
    public Role getRoleByID(@PathVariable int id){
        return roleService.getRoleByID(id);
    }

    @DeleteMapping(value = "/{id}")
    Boolean delete(@PathVariable int id){
        roleRepository.deleteById(id);
        return  true ;
    }

    @PutMapping(value = "/{id}")
    public Role update(@PathVariable("id")int id , @RequestBody Role role){
        role.setId(id);
        return  roleRepository.save(role);
    }

}
