package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.Role;
import java.util.List;

public interface RoleService {

    public Role newRole();

    public void deleteRole(Role role);

    public Role saverole(Role role);

    public List<Role> getAllRoles();

    public Role getRoleByID(int id);
}
