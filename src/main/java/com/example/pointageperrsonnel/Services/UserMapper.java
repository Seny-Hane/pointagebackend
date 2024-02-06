package com.example.pointageperrsonnel.Services;

import com.example.pointageperrsonnel.DTO.UserDTO;
import com.example.pointageperrsonnel.Entity.User;
import org.apache.poi.xwpf.usermodel.BreakType;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;

@Service
public class UserMapper {

    public   UserDTO mapToUserDto(User user){
        UserDTO userDTO = new UserDTO();
                BeanUtils.copyProperties(user,userDTO);
        return  userDTO;
    }

    public   User mapToUser(UserDTO userDTO){
        User user = new User();
               BeanUtils.copyProperties(userDTO,user);
        return user;
    }

}
