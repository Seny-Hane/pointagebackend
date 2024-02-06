package com.example.pointageperrsonnel.DTO;


import com.example.pointageperrsonnel.Entity.User;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Data
public class RoleDTO {
    private int id ;
    private String authority;

    private List<UserDTO> user = new ArrayList<>();
}
