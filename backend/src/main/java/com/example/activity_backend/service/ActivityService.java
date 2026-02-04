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
    return repo.findById(id).orElse(null);
  }

  public Activity save(Activity activity) {
    return repo.save(activity);
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }
}
