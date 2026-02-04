package com.example.activity_backend.controller;

import com.example.activity_backend.entity.Activity;
import com.example.activity_backend.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {
  private final ActivityService svc;

  public ActivityController(ActivityService svc) {
    this.svc = svc;
  }

  @GetMapping
  public List<Activity> all() {
    return svc.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Activity> get(@PathVariable Long id) {
    Activity a = svc.findById(id);
    if (a == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(a);
  }

  @PostMapping
  public ResponseEntity<Activity> create(@RequestBody Activity activity) {
    Activity saved = svc.save(activity);
    return ResponseEntity.ok(saved);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Activity> update(@PathVariable Long id, @RequestBody Activity activity) {
    Activity existing = svc.findById(id);
    if (existing == null)
      return ResponseEntity.notFound().build();
    activity.setId(id);
    Activity updated = svc.save(activity);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    Activity existing = svc.findById(id);
    if (existing == null)
      return ResponseEntity.notFound().build();
    svc.delete(id);
    return ResponseEntity.noContent().build();
  }
}
