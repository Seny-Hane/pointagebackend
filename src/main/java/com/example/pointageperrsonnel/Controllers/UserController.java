package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Services.UserService;
import com.example.pointageperrsonnel.Services.UserServiceImpl;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class UserController {

    private UserRepository userRepository;

    private UserService userService;

    @Autowired
    private KeycloakRestTemplate keycloakRestTemplate;

    @Autowired
    private KeyCloakService keyCloakService;


    //Liste de tous les users
    @GetMapping(value = "/alluser")
    public List<UserDTO> getAll(){
        List<UserDTO> userDTOS = userService.getAllUsers();
        System.out.println("utilisateur");
        System.out.println(userDTOS.size());
        System.out.println(userDTOS.get(0).getEmail());
        return userDTOS;
    }

//    //Afficher en fonction de l'id
//    @GetMapping(value = "/user/{id}")
//    public Object getUserById(@PathVariable Long id){
//        return keycloakRestTemplate.getForObject("/User/"+id, Object.class);
//    }
    //Afficher en fonction de l'id
    @GetMapping(value = "/user/{id}")
    public UserDTO getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    //Afficher en fonction de l'id
//    @GetMapping(value = "/user")
//    public UserDTO getUser(@PathVariable ){
//        return keycloakRestTemplate.getForObject("/User/"+id, Object.class);
//    }
    //Afficher en fonction de l'email
    @GetMapping(value="/email/{email}")
    public Object findByEmail(@PathVariable String email){
        return keycloakRestTemplate.getForObject("/User/email/"+email, Object.class);
    }

    //Save user
    @PostMapping("/user1")
    public UserDTO saveuser(@RequestBody UserDTO userDTO){
        try {
            //userRepository.save(users);
            userService.saveuser(userDTO);
            keyCloakService.addUser(userDTO);
        }catch (PersistenceException e) {
            e.getMessage();
        }
        return userDTO;
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

