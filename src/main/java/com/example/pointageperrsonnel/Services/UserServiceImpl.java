
package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.Entity.UserRole;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.UserRepository;
import com.example.pointageperrsonnel.Repository.UserRoleRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private KeyCloakService keyCloakService;

    @Override
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<User>();
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers){
            if (user.isEnable()){
                users.add(user);
            }
        }
        return users;
    }

    @Override
    public User saveuser(@RequestBody  User users) {
        User user = null;
        try{
            if(this.saveUser(users)){
                    user = users;
                    UserRole userRole = new UserRole();
                    userRole.setRole(user.getRole());
                    userRole.setUser(user);
                    userRole.setDateAtribution(new Date());
                    userRoleService.saveUserRole(userRole);
            }
                else {
                    this.deleteUser(user);
                }
        } catch (PersistenceException e){
            e.getMessage();
        }
        return user;
    }

    public boolean saveUser(User user) {
        if (userRepository.save(user)!=null)
            return true;
        else
            return false;
    }

    @Override
    public boolean userExist(int userId) {
        return userRepository.findById(userId).isPresent();
    }

    @Override
    public User findUserById(int userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUserByServiceCodeservice(int serviceCodeservice) {
        List<User> users = new ArrayList<User>();
        List<User> allUsers = userRepository.findByService(serviceCodeservice);
        for (User user : allUsers){
            if (user.isEnable()){
                users.add(user);
            }
        }
        return users;
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }


}

