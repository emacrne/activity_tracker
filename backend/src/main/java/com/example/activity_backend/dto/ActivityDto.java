package com.example.activity_backend.dto;

import jakarta.validation.constraints.*;
import org.springframework.lang.Nullable;
import java.time.LocalDate;

public class ActivityDto {
  private Long id;

  @Nullable
  private String name;

  @Nullable
  private String description;

  @Nullable
  private LocalDate date;

  @Nullable
  private Double durationHours;

  public ActivityDto() {
  }

  public ActivityDto(Long id, String name, String description, LocalDate date, Double durationHours) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.durationHours = durationHours;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public Double getDurationHours() {
    return durationHours;
  }

  public void setDurationHours(Double durationHours) {
    this.durationHours = durationHours;
  }
}
