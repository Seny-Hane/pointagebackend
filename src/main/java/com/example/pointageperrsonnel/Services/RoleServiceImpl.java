package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    KeyCloakService keyCloakService;

    @Override
    public Role newRole() {
        return null;
    }

    @Override
    public void deleteRole(Role role) {
        roleRepository.delete(role);
    }

    @Override
    public Role saverole(Role role) {
        return null;
    }

    public boolean saveRole(Role role) {
        if (roleRepository.save(role)!=null){
            return true;
        } else {
            return false;
        }
    }

    /*@Override
    public Role saverole(@RequestBody Role role) {
        Role role = null;
        try {
            if (this.saveRole(role)){
                keyCloakService.addRealmRole(role.getAuthority(), role.getDescription());
                role = role;
            } else {
                roleRepository.delete(role);
            }
        } catch (Exception e){
            e.getMessage();
            e.getCause();
        }
        return role;
    }*/

    @Override
    public List<Role> getAllRoles() {
        return null;
    }

    @Override
    public Role getRoleByID(int id) {
        return null;
    }


}
