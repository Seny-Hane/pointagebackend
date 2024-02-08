package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.User;
import com.example.pointageperrsonnel.Repository.ServiceRepository;
import org.apache.poi.xwpf.usermodel.BreakType;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;

@Service
public class UserMapper {
    @Autowired
    RoleService roleService;

    @Autowired
    ServiceRepository serviceRepository;

    public   UserDTO mapToUserDto(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setRole(user.getRole().getId());
        userDTO.setService(user.getService().getCodeservice());
                BeanUtils.copyProperties(user,userDTO);
        return  userDTO;
    }

    public   User mapToUser(UserDTO userDTO){
        User user = new User();
        user.setRole(roleService.getRoleByID(userDTO.getRole()));
        user.setService(serviceRepository.findServiceByCodeservice(userDTO.getService()));
               BeanUtils.copyProperties(userDTO,user);
        return user;
    }

}
