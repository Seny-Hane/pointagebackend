package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.Entity.UserRole;

import java.util.List;

public interface UserService {

  public User findByEmail(String email);

    public List<UserDTO> getAllUsers();

    public UserDTO saveuser(UserDTO userDTO);

    boolean userExist(int userId);

    UserDTO  getUserById(long userId) ;


    UserDTO updateUser(UserDTO userDTO);

    List<User> getUserByServiceCodeservice(int serviceCodeservice);

    public User findUserByEmail(String email);

    void deleteUser(User user);


}

