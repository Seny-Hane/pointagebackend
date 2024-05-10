package com.example.pointageperrsonnel.DTO;


import com.example.pointageperrsonnel.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

@Data
public class RoleDTO {
    private int id ;
    private String authority;

   // private List<UserDTO> user = new ArrayList<>();


}
