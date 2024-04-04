package com.demo.service;

import com.demo.entity.User;
import com.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    public User addUser(User user) {
        return userRepo.save(user);
    }

    public User updateUser(User user) {
        User existingUser = userRepo.findById(user.getId()).orElse(null);
        if (existingUser != null) {
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setDateOfBirth(user.getDateOfBirth());
            existingUser.setGender(user.getGender());
            existingUser.setEmail(user.getEmail());
            existingUser.setFullAddress(user.getFullAddress());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setUserStatus(user.getUserStatus());
            return userRepo.save(existingUser);
        } else {
            return null;
        }
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


    public User getUsersById(long id ) {return userRepo.findById(id);
    }


    public User deleteUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User does not exist for this id: " + id));
        return user;
    }

}
