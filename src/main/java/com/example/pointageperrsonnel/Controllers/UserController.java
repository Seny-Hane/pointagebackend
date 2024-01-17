package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Services.UserService;
import com.example.pointageperrsonnel.Services.UserServiceImpl;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.PersistenceException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private KeycloakRestTemplate keycloakRestTemplate;

    @Autowired
    private KeyCloakService keyCloakService;


    //Liste de tous les users
    @GetMapping(value = "/alluser")
    public List<User> getAll(){
        return userRepository.findAll();
    }

    //Afficher en fonction de l'id
    @GetMapping(value = "/user/{id}")
    public Object getUserById(@PathVariable int id){
        return keycloakRestTemplate.getForObject("/User/"+id, Object.class);
    }

    //Afficher en fonction de l'email
    @GetMapping(value="/email/{email}")
    public Object findByEmail(@PathVariable String email){
        return keycloakRestTemplate.getForObject("/User/email/"+email, Object.class);
    }

    //Save user
    @PostMapping("/user1")
    public User saveuser(@RequestBody User users){
        try {
            //userRepository.save(users);
            userService.saveuser(users);
            keyCloakService.addUser(users);
        }catch (PersistenceException e) {
            e.getMessage();
        }
        return users;
    }

    @GetMapping(value = "/service/{codeservice}")
    public List<User> getUserByServiceCodeservice(@PathVariable int codeservice){
        return userService.getUserByServiceCodeservice(codeservice);
    }

/*
/Save user
    @PostMapping(value = "/saveuser")
    public User save(@RequestBody User user){
        return userRepository.save(user);
    }*/


}

