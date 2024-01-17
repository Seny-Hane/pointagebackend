package com.example.pointageperrsonnel.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
public class UserRoleId implements Serializable {

    //@JoinColumn(name = "id_user",nullable = false)
    private int user;

    //@JoinColumn(name = "id_role",nullable = false)
    private int role;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRoleId that = (UserRoleId) o;
        return user == that.user && role == that.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, role);
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getRole() { return role; }

    public void setRole(int role) {
        this.role = role;
    }
}
