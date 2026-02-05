package com.example.activity_backend.controller;

import com.example.activity_backend.dto.ActivityDto;
import com.example.activity_backend.entity.Activity;
import com.example.activity_backend.mapper.ActivityMapper;
import com.example.activity_backend.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {
  private final ActivityService svc;

  public ActivityController(ActivityService svc) {
    this.svc = svc;
  }

  @GetMapping
  public List<ActivityDto> all() {
    return svc.findAll().stream().map(ActivityMapper::toDto).collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ActivityDto> get(@PathVariable Long id) {
    Activity a = svc.findById(id);
    if (a == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(ActivityMapper.toDto(a));
  }

  @PostMapping
  public ResponseEntity<ActivityDto> create(@Valid @RequestBody ActivityDto dto) {
    Activity toSave = ActivityMapper.toEntity(dto);
    Activity saved = svc.save(toSave);
    return ResponseEntity.status(HttpStatus.CREATED).body(ActivityMapper.toDto(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ActivityDto> update(@PathVariable Long id, @Valid @RequestBody ActivityDto dto) {
    Activity existing = svc.findById(id);
    if (existing == null)
      return ResponseEntity.notFound().build();
    dto.setId(id);
    Activity updated = svc.save(ActivityMapper.toEntity(dto));
    return ResponseEntity.ok(ActivityMapper.toDto(updated));
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
