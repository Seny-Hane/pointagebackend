package com.example.pointageperrsonnel.KeycloakSecurity;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.User;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
//AJOUT
import static com.example.pointageperrsonnel.KeycloakSecurity.KeycloakConfig.*;

@AllArgsConstructor
@Service
public class KeyCloakService {

    public boolean addUser(UserDTO userDTO){
        System.out.println(userDTO.toString());
        boolean result = false;
        CredentialRepresentation credential = Credentials
                .createPasswordCredentials("1234");
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(userDTO.getEmail());
        newUser.setFirstName(userDTO.getPrenom());
        newUser.setLastName(userDTO.getNom());
        newUser.setEmail(userDTO.getEmail());
        newUser.setCredentials(Collections.singletonList(credential));
        newUser.setEnabled(userDTO.isEnable());
        newUser.setRequiredActions(Collections.singletonList("UPDATE_PASSWORD"));
        System.out.println(newUser.toString());

        UsersResource instance = getInstance();
        instance.create(newUser);
        /*if (instance.create(newUser)!=null){
            result = true;
        }*/
        return true;
    }

    /*public void addUser2(User user){
        boolean result = false;
        CredentialRepresentation credential = Credentials
                //.createPasswordCredentials(user.getPassword());
                .createPasswordCredentials("1234");
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(user.getEmail());
        newUser.setFirstName(user.getPrenom());
        newUser.setLastName(user.getNom());
        //newUser.setEmail(user.getEmail());
        newUser.setCredentials(Collections.singletonList(credential));
        newUser.setEnabled(user.isEnable());

        UsersResource instance = getInstance();
        instance.create(newUser);
    }*/

    /*@Transactional
    public void addListUser(List<User> users) {
        int counter = 0;
        for (User emp : users) {
            this.addUser2(emp);
            String username = emp.getEmail();
            for (int i = 0; i < emp.getRoles().size(); i++){
                String roleName = emp.getRoles().get(i).getAuthority();
                this.addRealmRoleToUser(username, roleName);
            }
            counter++;
        }
    }*/

    public List<UserRepresentation> getUser(String userName){
        UsersResource usersResource = getInstance();
        List<UserRepresentation> user = usersResource.search(userName, true);
        return user;
    }

    public List<UserRepresentation> getAllUser(){
        UsersResource usersResource = getInstance();
        List<UserRepresentation> user = usersResource.list();
        return user;
    }

    public void updateUser(String userId, User user){
        UserRepresentation newUser = new UserRepresentation();
        newUser.setUsername(user.getEmail());
        newUser.setFirstName(user.getPrenom());
        newUser.setLastName(user.getNom());
        newUser.setEmail(user.getEmail());
        newUser.setEnabled(true);

        List<String>requiredActions = new ArrayList<>();
        requiredActions.add("UPDATE_PASSWORD");
        newUser.setRequiredActions (requiredActions);

        UsersResource usersResource = getInstance();
        usersResource.get(userId).update(newUser);
    }

    public void deleteUser(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .remove();
    }

    /*@Transactional
    public void deleteListUser(List<User> users) {
        int counter = 0;
        for (User emp : users) {
            try{
                String userId = this.getUserIdKeycloak(emp.getEmail());
                this.deleteUser(userId);
            } catch (Exception e){
                e.getCause();
            }
            counter++;
        }
    }*/

    public void sendVerificationLink(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .sendVerifyEmail();
    }

    public void sendResetPassword(String userId){
        UsersResource usersResource = getInstance();

        usersResource.get(userId)
                .executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
    }

    private UsersResource getInstance() {
       // return null;
        //AJOUT
        return KeycloakConfig.getInstance().realm(realm).users();
    }

    private void getUserIdKeycloak(String email) {}

    private void addRealmRoleToUser(String username, String roleName) {}

    public List<String> getAllRoles(){
        List<String> availableRoles = KeycloakConfig.getInstance()
                .realm(realm)
                .roles()
                .list()
                .stream()
                .map(role -> role.getName())
                .collect(Collectors.toList());
        return availableRoles;
    }

    /**
     * méthode pour ajouter un nouveau rôle client
     * @param new_role_name
     */
    public void addRealmRole(String new_role_name, String role_description){
        if(!getAllRoles().contains(new_role_name)){
            RoleRepresentation roleRep = new  RoleRepresentation();
            roleRep.setName(new_role_name);
            roleRep.setDescription(role_description);
            KeycloakConfig.getInstance().realm(realm)
                    .roles()
                    .create(roleRep);
        }
    }

    /**
     * méthode pour supprimer un rôle client
     * @param roleName
     */
    public void deleteRealmRole(String roleName){
        if(!getAllRoles().contains(roleName)){
            KeycloakConfig.getInstance().realm(realm)
                    .roles()
                    .deleteRole(roleName);
        }
    }

    /**
     * méthode pour ajouter un rôle client spécifié par son nom à un utilisateur spécifié par un nom d'utilisateur
     * @param userName
     * @param role_name
     *//*
    public void addRealmRoleToUser(String userName, String role_name){
        String userId = KeycloakConfig.getInstance()
                .realm(realm)
                .users()
                .search(userName)
                .get(0)
                .getId();
        UserResource user = KeycloakConfig.getInstance()
                .realm(realm)
                .users()
                .get(userId);
        List<RoleRepresentation> roleToAdd = new LinkedList<>();
        roleToAdd.add(KeycloakConfig.getInstance()
                .realm(realm)
                .roles()
                .get(role_name)
                .toRepresentation()
        );
        user.roles().realmLevel().add(roleToAdd);
    }

    *//**
     * méthode pour supprimer un rôle client spécifié par son nom à un utilisateur spécifié par un nom d'utilisateur
     * @param userName
     * @param role_name
     *//*
    public void removeRealmRoleToUser(String userName, String role_name){
        String userId = KeycloakConfig.getInstance()
                .realm(realm)
                .users()
                .search(userName)
                .get(0)
                .getId();
        UserResource user = KeycloakConfig.getInstance()
                .realm(realm)
                .users()
                .get(userId);
        List<RoleRepresentation> roleToAdd = new LinkedList<>();
        roleToAdd.add(KeycloakConfig.getInstance()
                .realm(realm)
                .roles()
                .get(role_name)
                .toRepresentation()
        );
        user.roles().realmLevel().remove(roleToAdd);
    }


    public String getUserIdKeycloak(String userName){
        String userId = KeycloakConfig.getInstance()
                .realm(realm)
                .users()
                .search(userName)
                .get(0)
                .getId();
        return userId;
    }*/


}
