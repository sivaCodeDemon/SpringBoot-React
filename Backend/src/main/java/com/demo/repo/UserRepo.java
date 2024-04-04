package com.demo.repo;

import com.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    public List<User> findUsersByFirstName(String firstName);

    public User findById(long id);

}
