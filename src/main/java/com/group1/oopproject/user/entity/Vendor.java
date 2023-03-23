package com.group1.oopproject.user.entity;

import com.group1.oopproject.workflow.entity.Workflow;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.time.LocalDateTime;

@Document(collection = "vendors")
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Vendor extends User {

   private String companyName;
   private String regNumber;
   private String bizNature;
   private String contactNum;
   private String GSTnumber;
   private String country;

}