package com.group1.oopproject.user.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.group1.oopproject.user.entity.UserType;
import com.group1.oopproject.user.entity.Vendor;
import com.group1.oopproject.user.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import org.springframework.stereotype.Service;

import com.group1.oopproject.exception.DatabaseCommunicationException;
import com.group1.oopproject.exception.UserNotFoundException;
import com.group1.oopproject.user.entity.User;
import com.group1.oopproject.user.repository.UserRepository;

import com.group1.oopproject.archive.entity.ArchiveDocument;
import com.group1.oopproject.archive.service.ArchiveService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ArchiveService archiveService;

    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                throw new UserNotFoundException("No users found in the database");
            }
            return users;
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public List<Vendor> getAllVendors() {
        try {
            List<Vendor> vendors = vendorRepository.findAll();
            if (vendors.isEmpty()) {
                throw new UserNotFoundException("No vendors found in the database");
            }
            return vendors;
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
//            throw e;
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public List<User> getAllUsersByType(String userType) {
        try {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) {
                throw new UserNotFoundException("No users found in the database");
            }

            List<User> userResult = new ArrayList<>();
            for (User userItem : users){
                if (userItem.getUserType() == UserType.valueOf(userType)){
                    userResult.add(userItem);
                }
            }

            if (userResult.isEmpty()) {
                throw new UserNotFoundException("No "+ userType +" users found in the database");
            }

            return userResult;
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
//            throw e;
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public List<Vendor> getAllVendorsByCompany(String companyName) {
        try {
            List<Vendor> vendors = vendorRepository.findAll();
            if (vendors.isEmpty()) {
                throw new UserNotFoundException("No vendors found in the database");
            }

            List<Vendor> vendorResult = new ArrayList<>();
            for (Vendor vendorItem : vendors){
                if (companyName.equals(vendorItem.getCompanyName())){
                    vendorResult.add(vendorItem);
                }
            }

            if (vendorResult.isEmpty()) {
                throw new UserNotFoundException("No vendor from " + companyName + " found in the database");
            }

            return vendorResult;
        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
//            throw e;
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public User findUserById(String id) throws UserNotFoundException {
        try {
            Optional<User> user = userRepository.findById(id);
            return user.orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public Vendor findVendorById(String id) throws UserNotFoundException {
        try {
            Optional<Vendor> vendor = vendorRepository.findById(id);
            return vendor.orElseThrow(() -> new UserNotFoundException("Vendor not found with id: " + id));
        } catch (UncategorizedMongoDbException e) {
//            throw e;
            throw new DatabaseCommunicationException("Error communicating with database", e);
        }
    }

    public User createUser(User user) throws DatabaseCommunicationException {
        try {
            user.setCreatedAt(LocalDateTime.now());
            return userRepository.save(user);
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with the database while creating the user",
                    e);
        }
    }

    public Vendor createVendor(Vendor vendor) throws DatabaseCommunicationException {
        try {
            vendor.setCreatedAt(LocalDateTime.now());
            return vendorRepository.save(vendor);
        } catch (Exception e) {
//            throw e;
            throw new DatabaseCommunicationException("Error communicating with the database while creating the user",
                    e);
        }
    }

    public void deleteUser(String id, String deleterId) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("No users found in the database for user with id: " + id));
            userRepository.deleteById(user.getId());

            // archive this document
            archiveService.createArchiveDocument(ArchiveDocument.builder().id(user.getId()).collection("users").deletedBy(deleterId).data(user).build());
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById: " + e.getMessage(), e);
        }
    }

    public void deleteVendor(String id, String deleterId) {
        try {
            Vendor vendor = vendorRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("No vendors found in the database for vendor with id: " + id));
            vendorRepository.deleteById(vendor.getId());
            // archive this document
            archiveService.createArchiveDocument(ArchiveDocument.builder().id(vendor.getId()).collection("users").deletedBy(deleterId).data(vendor).build());
        } catch (Exception e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById: " + e.getMessage(), e);
        }
    }

    public User loginUser(String id,String pw) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("Either userId or password is wrong. Please try again"));

            // check pw
            if (user.getPassword().equals(pw)){
                return user;
            }
            else{
                throw new UserNotFoundException("Either userId or password is wrong. Please try again");
            }

        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }

    public Vendor loginVendor(String id,String pw) {
        try {
            Vendor vendor = vendorRepository.findById(id)
                    .orElseThrow(() -> new UserNotFoundException("Either userId or password is wrong. Please try again"));

            // check pw
            if (vendor.getPassword().equals(pw)){
                return vendor;
            }
            else{
                throw new UserNotFoundException("Either userId or password is wrong. Please try again");
            }

        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }


    public User updateUser(User user) {
        try {
            // Check if user exists
            if (userRepository.findById(user.getId()).isPresent()){
                // UPDATE
                return userRepository.save(user);
            } else {
                throw new UserNotFoundException("No users found in the database for user with id: " + user.getId());
            }
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }

    public Vendor updateVendor(Vendor vendor) {
        try {
            // Check if user exists
            if (vendorRepository.findById(vendor.getId()).isPresent()){
                // UPDATE
                return vendorRepository.save(vendor);
            } else {
                throw new UserNotFoundException("No vendors found in the database for vendor with id: " + vendor.getId());
            }
        } catch (UncategorizedMongoDbException e) {
            throw new DatabaseCommunicationException("Error communicating with database for method deleteById", e);
        }
    }
}