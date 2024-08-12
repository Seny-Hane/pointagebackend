package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.UserRole;
import javassist.NotFoundException;

import java.util.List;

public interface UserRoleService {

    public void affectRoleToUser(UserRole userRole);

    List<UserRole> getAllUserRole();

    void saveUserRole(UserRole userRole);

    boolean saveUserRoleBool(UserRole userRole);

    void deleteUserRole(UserRole userRole);

    void deleteGroupRoleToUser(List<UserRole> userRoles);

    void deleteGroupRoleToUser2(int user, List<Role> roles);

    String affectGroupRoleToUser2(int user, List<Role> roles) throws NotFoundException;

    void affectGroupRoleToUser(List<UserRole> userRoles) throws NotFoundException;

    boolean findUserRoleByRole(UserRole userRole);
}
