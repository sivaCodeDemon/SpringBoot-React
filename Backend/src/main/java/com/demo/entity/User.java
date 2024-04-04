package com.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import javax.validation.constraints.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "usersTable")
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "First name is required")
	private String firstName;

	@NotBlank(message = "Last name is required")
	private String lastName;

	@Past(message = "Date of birth must be in the past")
	private Date dateOfBirth;

	@NotBlank(message = "Gender is required")
	private String gender;

	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Full address is required")
	private String fullAddress;

	@NotNull(message = "Phone number is required")
	@Positive(message = "Phone number must be positive")
	private Long phoneNumber;

	@NotNull(message = "User status is required")
	private Boolean userStatus;

}
