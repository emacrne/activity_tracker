package com.example.activity_backend.service;

import com.example.activity_backend.entity.Activity;
import com.example.activity_backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

  private final ActivityRepository repo;

  public ActivityService(ActivityRepository repo) {
    this.repo = repo;
  }

  public List<Activity> findAll() {
    return repo.findAll();
  }

  public Activity findById(Long id) {
    return repo.findById(id).orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
  }

  public Activity save(Activity activity) {
    return repo.save(activity);
  }

  public void delete(Long id) {
    if (!repo.existsById(id)) {
      throw new RuntimeException("Activity not found with id: " + id);
    }
    repo.deleteById(id);
  }
}
