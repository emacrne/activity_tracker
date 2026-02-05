package com.example.activity_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "activities")

public class Activity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private LocalDate date;

  @Column(length = 2000)
  private String description;

  private Double durationHours;

  public Activity() {
  }

  public Activity(String name, LocalDate date, String description, Double durationHours) {
    this.name = name;
    this.date = date;
    this.description = description;
    this.durationHours = durationHours;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getDurationHours() {
    return durationHours;
  }

  public void setDurationHours(Double durationHours) {
    this.durationHours = durationHours;
  }
}
