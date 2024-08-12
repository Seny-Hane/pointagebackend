package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Services.UserMapper;
import com.example.pointageperrsonnel.Services.UserService;
import lombok.AllArgsConstructor;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
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


    UserMapper userMapper;

    //Liste de tous les users
    @GetMapping(value = "/alluser")
    public List<User> getAll(){
        List<User> users = userRepository.findAll();
        System.out.println("utilisateur");
        System.out.println(users.size());
        System.out.println(users.get(0).getEmail());
        return users;
    }

//    //Afficher en fonction de l'id
//    @GetMapping(value = "/user/{id}")
//    public Object getUserById(@PathVariable Long id){
//        return keycloakRestTemplate.getForObject("/User/"+id, Object.class);
//    }
    //Afficher en fonction de l'id
    @GetMapping(value = "/user/{id}")
    public Optional<User> getUserById(@PathVariable int id){
        return userRepository.findById(id);
    }

    //Afficher en fonction de l'id
//    @GetMapping(value = "/user")
//    public UserDTO getUser(@PathVariable ){
//        return keycloakRestTemplate.getForObject("/User/"+id, Object.class);
//    }
    //Afficher en fonction de l'email
    @GetMapping(value="/email/{email}")
    public Object findByEmail(@PathVariable String email){
        return keyCloakService.getUser(email);
    }
    @GetMapping(value = "/emails/{email}")
    public User findUserByEmail(@PathVariable String email){
        return userRepository.findUserByEmail(email);
    }

    //Save user
//    @PostMapping("/user1")
//    public UserDTO saveuser(@RequestBody UserDTO userDTO){
//        try {
//
//            userService.saveuser(userDTO);
//            keyCloakService.addUser(userDTO);
//        }catch (PersistenceException e) {
//            e.getMessage();
//        }
//        return userDTO;
//    }
    @PostMapping("/user1")
    public User saveuser(@RequestBody User user){
        try {

            userRepository.save(user);
            keyCloakService.addUser(user);
        }catch (PersistenceException e) {
            e.getMessage();
        }
        return user;
    }
    @PutMapping("/user1/{id}")
    public User  updateUser(@PathVariable("id") int id,@RequestBody User user){
        try {
            //userRepository.save(users);
            String UserId = keyCloakService.getUserIdKeycloak(user.getEmail());
            System.out.println(UserId);
            keyCloakService.updateUser(UserId,user);
            user.setId(id);
            userRepository.save(user);

        }catch (PersistenceException e) {
            e.getMessage();
        }
        return user;
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

//    @PostMapping("/reset-password/{userId}")
//    public void resetPassword(@PathVariable String userId) {
//        keyCloakService.sendResetPassword(userId);
//    }
//
//    @PostMapping("/send-verification-link/{userId}")
//    public void sendVerificationLink(@PathVariable String userId) {
//        keyCloakService.sendVerificationLink(userId);
//    }
//
//    @PostMapping("/reset-password/username/{username}")
//    public void resetPasswordByUsername(@PathVariable String username) {
//        keyCloakService.sendResetPasswordByUsername(username);
//    }



}

