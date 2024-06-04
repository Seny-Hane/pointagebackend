package com.example.pointageperrsonnel.Controllers;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.UserRole;
import com.example.pointageperrsonnel.Repository.UserRoleRepository;
import com.example.pointageperrsonnel.Services.UserRoleServiceImpl;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/userRole")
@CrossOrigin("*")
public class UserRoleController {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRoleServiceImpl userRoleService;

    @Autowired
    private KeycloakRestTemplate keycloakRestTemplate;

    @GetMapping(value = "")
    public List<UserRole> getAllUserRole() {
        return userRoleService.getAllUserRole();
    }

    @PostMapping(value = "")
    public void affectRoleToUser(@RequestBody UserRole userRole){
        userRoleService.affectRoleToUser(userRole);
    }

    @PostMapping(value = "/affectGroupRoleToUser")
    public void affectGroupRoleToUser(@RequestBody List<UserRole> userRoles){
        userRoleService.affectGroupRoleToUser(userRoles);
    }

    @PostMapping(value = "/affectGroupRoleToUser/{idUser}")
    public String affectGroupRoleToUser2(@PathVariable int idUser, @RequestBody List<Role> userRoles){
        return userRoleService.affectGroupRoleToUser2(idUser, userRoles);
    }

    @PatchMapping(value ="deleteGroupRoleToUser")
    public void  deleteGroupRoleToUser(@RequestBody List<UserRole> userRoles){
        userRoleService.deleteGroupRoleToUser(userRoles);
    }

    @PatchMapping(value ="deleteGroupRoleToUser/{idUser}")
    public void  deleteGroupRoleToUser2(@PathVariable int idUser,@RequestBody List<Role> roles){
        userRoleService.deleteGroupRoleToUser2(idUser, roles);
    }

    @GetMapping(value = "/test1")
    public boolean test(@RequestBody UserRole userRole) {
        return userRoleService.findUserRoleByRole(userRole);
    }

}

