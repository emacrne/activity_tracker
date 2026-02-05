package com.example.activity_backend.mapper;

import com.example.activity_backend.entity.Activity;
import com.example.activity_backend.dto.ActivityDto;

public class ActivityMapper {
  public static ActivityDto toDto(Activity a) {
    if (a == null)
      return null;
    return new ActivityDto(a.getId(), a.getName(), a.getDescription(), a.getDate(), a.getDurationHours());
  }

  public static Activity toEntity(ActivityDto d) {
    if (d == null)
      return null;
    Activity a = new Activity();
    // no id -> database getenerates it
    a.setName(d.getName());
    a.setDescription(d.getDescription());
    a.setDate(d.getDate());
    a.setDurationHours(d.getDurationHours());
    return a;
  }
}
