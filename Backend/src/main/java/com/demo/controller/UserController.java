package com.demo.controller;

import com.demo.entity.User;
import com.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

/**
 * @author  sivaK
 */
@RestController
@RequestMapping("/api/v1")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


	@Autowired
	private UserService userService;


	/**
	 *
	 * @param user
	 * @return users
	 */
	@PostMapping("/addUser")
	public ResponseEntity<User> addUsers(@RequestBody @Valid User user){
		log.info("Invoking add user into DB");
			return new ResponseEntity<User>(userService.addUser(user), HttpStatus.OK);
		}


	/**
	 * update the user based on the Id
	 * @param user
	 * @return
	 */
	@PutMapping("/updateUser")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		log.info("Invoking the updateUser based on id, {}", user.getId());
		User updatedUser = userService.updateUser(user);
		if (updatedUser != null) {
			return ResponseEntity.ok(updatedUser);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	/**
	 * getAll users from db
	 * @return Users
	 */
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers(){
		log.info("Invoking getAll Users ");
			return new ResponseEntity<List<User>>(userService.getAllUsers(),HttpStatus.OK);
	}


	/**
	 * get users data by id
	 * @param id
	 * @return User details
	 */
	@GetMapping("/getUserById/{id}")
	public ResponseEntity<User> getUsersById(@PathVariable Long id) {
		log.info("Invoking Retrieving users by id '{}'", id);
		return new ResponseEntity<>(userService.getUsersById(id),HttpStatus.OK);
	}

	/**
	 * delete the user by id
	 * @param id
	 * @return
	 */
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable Long id) {
		log.info("Invoking deleting user by id '{}'", id);
		return new ResponseEntity<>(userService.deleteUserById(id),HttpStatus.OK);
	}





}
