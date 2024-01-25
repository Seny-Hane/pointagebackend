package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.Entity.UserRole;

import java.util.List;

public interface UserService {

    public User findByEmail(String email);

    public List<User> getAllUsers();

    public User saveuser(User user);

    boolean userExist(int userId);

    User findUserById(int userId);

    User updateUser(User user);

    List<User> getUserByServiceCodeservice(int serviceCodeservice);

    void deleteUser(User user);


}

