package com.example.pointageperrsonnel.KeycloakSecurity;

import com.example.pointageperrsonnel.Entity.User;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
public class KeycloakController {

    @Autowired
    KeyCloakService service;

    @PostMapping(value = "addlistuser")
    public String addUser(@RequestBody List<User> users){
        service.addListUser(users);
        return "Users Added Successfully.";
    }

    @PostMapping
    public String addListUser(@RequestBody User user){
        service.addUser(user);
        return "User Added Successfully.";
    }

    @GetMapping(path = "/{userName}")
    public List<UserRepresentation> getUser(@PathVariable("userName") String userName){
        List<UserRepresentation> user = service.getUser(userName);
        return user;
    }

    @GetMapping(path = "/all")
    public List<UserRepresentation> getAllUser(){
        List<UserRepresentation> user = service.getAllUser();
        return user;
    }

    @PutMapping(path = "/update/{userId}")
    public String updateUser(@PathVariable("userId") String userId, @RequestBody User user){
        service.updateUser(userId, user);
        return "User Details Updated Successfully.";
    }

    @DeleteMapping(path = "/delete/{userId}")
    public String deleteUser(@PathVariable("userId") String userId){
        service.deleteUser(userId);
        return "User Deleted Successfully.";
    }

    /*@DeleteMapping(path = "/deletelistuser")
    public String deleteListUser(@RequestBody List<User> users){
        service.deleteListUser(users);
        return "Users Deleted Successfully.";
    }
*/
    @GetMapping(path = "/verification-link/{userId}")
    public String sendVerificationLink(@PathVariable("userId") String userId){
        service.sendVerificationLink(userId);
        return "Verification Link Send to Registered E-mail Id.";
    }

    @GetMapping(path = "/reset-password/{userId}")
    public String sendResetPassword(@PathVariable("userId") String userId){
        service.sendResetPassword(userId);
        return "Reset Password Link Send Successfully to Registered E-mail Id.";
    }

    /*@GetMapping(value = "/getroles")
    public List<String> getAllRoles(){
        return service.getAllRoles();
    }*/

    /*@GetMapping(value = "/getuerid/{username}")
    public String getUserid(@PathVariable String username){
        return service.getUserIdKeycloak(username);
    }*/

}
