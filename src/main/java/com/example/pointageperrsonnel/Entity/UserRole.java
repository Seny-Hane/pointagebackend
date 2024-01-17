package com.example.pointageperrsonnel.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserRoleId.class)
@Table(name = "Users_Roles_Associations")
public class UserRole {
    @Id
    @ManyToOne
    @JoinColumn(name = "id_user",nullable = false)
    @JsonIgnoreProperties({"roles","enable","service"})
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_role",nullable = false)
    @JsonIgnoreProperties({"users"})
    private Role role;

    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date dateAtribution = new Date();

    public UserRole(User user, Role role) {
        this.user = user;
        this.role = role;
    }
}
