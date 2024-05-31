package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.Entity.UserRole;
import com.example.pointageperrsonnel.Entity.UserRoleId;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.RoleRepository;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserRoleServiceImpl implements UserRoleService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    KeyCloakService keyCloakService;

    @Autowired
    UserRoleService userRoleService;
    @Override
    public void affectRoleToUser(UserRole userRole) {
    }


    @Override
    public List<UserRole> getAllUserRole() {
        return userRoleRepository.findAll();
    }

    @Override
    public void saveUserRole(UserRole userRole) {
        userRoleRepository.save(userRole);
    }


    @Override
    public boolean saveUserRoleBool(UserRole userRole) {
        if (userRoleRepository.save(userRole)!=null){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void deleteUserRole(UserRole userRole) {
        userRoleRepository.delete(userRole);
    }

    @Override
    public void deleteGroupRoleToUser(List<UserRole> userRoles) {
        int size = userRoles.size();
        int counter = 0;

        List<UserRole> temp = new ArrayList<>();

        for (UserRole emp : userRoles) {
            temp.add(emp);

            if ((counter + 1) % 500 == 0 || (counter + 1) == size) {
                for (UserRole tempEmp : temp) {
                    String username = tempEmp.getUser().getEmail();
                    String roleName = tempEmp.getRole().getAuthority();
                    keyCloakService.removeRealmRoleToUser(username, roleName);
                }
                userRoleRepository.deleteAll(temp);
                temp.clear();
            }
            counter++;
        }


    }

    @Override
    public void deleteGroupRoleToUser2(int idUser, List<Role> roles) {
        int size = roles.size();
        int counter = 1;
        User user1 = userRepository.findById(idUser).get();
        List<UserRole> userRoleList = new ArrayList<>();

        for (Role role : roles) {
            UserRole userRole = new UserRole(user1,role);
            userRoleList.add(userRole);
            if (counter == size) {
                for (UserRole role1 : userRoleList) {
                    String username = role1.getUser().getEmail();
                    String roleName = role1.getRole().getAuthority();
                    keyCloakService.removeRealmRoleToUser(username, roleName);
                  //  keyCloakService.addRealmRoleToUser(username, roleName);
                }
                userRoleRepository.deleteAll(userRoleList);
                userRoleRepository.saveAll(userRoleList);
                userRoleList.clear();
            }
            counter++;
        }

    }

    @Override
    public String affectGroupRoleToUser2(int idUser, List<Role> roles) {
        String message = null;
        int size = roles.size();
        int counter = 1;
        List<UserRole> userRoleList = new ArrayList<>();
        User user1 = userRepository.findById(idUser).get();
        for (Role role : roles) {
            UserRole userRole = new UserRole(user1,role,new Date());
           // if (this.findUserRoleByRoleReceveur(userRole)){
                userRoleList.add(userRole);
                if (counter == size) {
                    if(userRoleRepository.saveAll(userRoleList)!=null){
                        for (UserRole user_role : userRoleList){
                            String username = user_role.getUser().getEmail();
                            String roleName = user_role.getRole().getAuthority();
                            keyCloakService.addRealmRoleToUser(username, roleName);
                        }
                    }
                    userRoleList.clear();
                }
                counter++;
          //  }
        }
        return message;
    }

    @Override
    public void affectGroupRoleToUser(List<UserRole> userRoles) {
        int size = userRoles.size();
        int counter = 0;
        List<UserRole> temp = new ArrayList<>();
        for (UserRole emp : userRoles) {
        //   if (this.findUserRoleByRoleReceveur(emp)){
                temp.add(emp);
                if ((counter + 1) == size) {
                    if (userRoleRepository.saveAll(temp)!=null){
                        for (UserRole tempEmp : temp) {
                            String username = tempEmp.getUser().getEmail();
                            String roleName = tempEmp.getRole().getAuthority();
                            keyCloakService.addRealmRoleToUser(username, roleName);
                        }
                    }
                    temp.clear();
                }
                counter++;
          //  }
        }


    }

    @Override
    public boolean findUserRoleByRole(UserRole userRole) {
        int idRole = userRole.getRole().getId();
        boolean retour = true;
        if (idRole==1 || idRole==2){
            if (userRoleRepository.findUserRoleByRole(userRole.getUser().getService().getCodeservice()).size()!=0)
                retour = false;
        }
        return retour;
    }


}
