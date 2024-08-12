
package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.Role;
import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.KeycloakSecurity.KeyCloakService;
import com.example.pointageperrsonnel.Repository.RoleRepository;
import com.example.pointageperrsonnel.Repository.ServiceRepository;
import com.example.pointageperrsonnel.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ServiceRepository serviceRepository;
    private UserRoleService userRoleService;

    @Autowired
    private KeyCloakService keyCloakService;

    //private ModelMapper mapper;

    UserMapper userMapper;

//    @Override
//    public User findByEmail(String email){
//
//        return userRepository.findByEmail(email);
//    }

    @Override
    public User findByEmail(String email) {
        return findByEmail(email);
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
       System.out.println(allUsers.size());
       return allUsers;



    }

    @Override
    public UserDTO saveuser( UserDTO userDTO) {
        User user =  userMapper.mapToUser(userDTO);
       // Role role = roleRepository.getById(userDTO.getRole());
      //  user.setRole(role);
        com.example.pointageperrsonnel.Entity.Service service = serviceRepository.getById(userDTO.getService().getCodeservice());
        Role role= roleRepository.getById(userDTO.getId());
        user.setService(service);
       // user.setRoles((userDTO.get role);
        user.setNom(userDTO.getNom());
        user.setEmail(userDTO.getEmail());
        user.setPrenom(userDTO.getPrenom());
        user.setMatricule(userDTO.getMatricule());
        user.setReference(userDTO.getReference());
        user.setTelephone(userDTO.getTelephone());
        user.setEnable(userDTO.isEnable());

//        try{
//            if(this.saveUser(user)){
//                    UserRole userRole = new UserRole();
//                 //   userRole.setRole(user.getRole());
//                    userRole.setUser(user);
//                    userRole.setDateAtribution(new Date());
//                    userRoleService.saveUserRole(userRole);
//            }
//                else {
//                    this.deleteUser(user);
//                }
//        } catch (PersistenceException e){
//            e.getMessage();
//        }
        User savedUser = userRepository.save(user);
        return userMapper.mapToUserDto(savedUser);
    }

    public boolean saveUser(User user) {
        if (userRepository.save(user)!=null)
            return true;
        else
            return false;
    }
//    @Override
//    public User findUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }

    @Override
    public boolean userExist(int userId) {
        return userRepository.findById(userId).isPresent();
    }

    @Override
    public UserDTO getUserById(long userId) {
//            User user = userRepository.findById(userId);
//        return  userMapper.mapToUserDto(user);
       // return userRepository.findById(userId).get();
        return null;
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }


//    @Override
//    public User updateUser(int userId,User user) {
//       // User user = userMapper.mapToUser(userDTO);
//        com.example.pointageperrsonnel.Entity.Service service = serviceRepository.getById(user.getService().getCodeservice());
//
//        Optional<User> user2 = userRepository.findById(userId);
//        if (user2.isPresent()) {
//            User user1= user2.get();
//            user1.setService(service);
//            user1.setNom(user.getNom());
//            user1.setEmail(user.getEmail());
//            user1.setPrenom(user.getPrenom());
//            user1.setMatricule(user.getMatricule());
//            user1.setReference(user.getReference());
//            user1.setTelephone(user.getTelephone());
//            user1.setEnable(user.isEnable());
//
//
//            User saved = userRepository.save(user1);
//          //  return userMapper.mapToUserDto(saved);
//            return saved;
//        }else {
//            throw new EntityNotFoundException("Objet non trouvé avec l'ID : " + userId);
//
//        }
//    }

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
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }


}

