package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.UserRole;
import com.example.pointageperrsonnel.Repository.RoleRepository;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserRoleServiceImpl implements UserRoleService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

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

    }

    @Override
    public void deleteGroupRoleToUser2(int user, List<Role> roles) {

    }

    @Override
    public String affectGroupRoleToUser2(int user, List<Role> roles) {
        return null;
    }

    @Override
    public void affectGroupRoleToUser(List<UserRole> userRoles) {

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
