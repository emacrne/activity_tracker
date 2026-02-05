package com.example.activity_backend.controller;

import com.example.activity_backend.dto.ActivityDto;
import com.example.activity_backend.entity.Activity;
import com.example.activity_backend.mapper.ActivityMapper;
import com.example.activity_backend.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:5173}")
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
    return ResponseEntity.ok(ActivityMapper.toDto(svc.findById(id)));
  }

  @PostMapping
  public ResponseEntity<ActivityDto> create(@RequestBody ActivityDto dto) {
    Activity toSave = ActivityMapper.toEntity(dto);
    Activity saved = svc.save(toSave);
    return ResponseEntity.status(HttpStatus.CREATED).body(ActivityMapper.toDto(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ActivityDto> update(@PathVariable Long id, @RequestBody ActivityDto dto) {
    Activity existing = svc.findById(id);
    if (dto.getName() != null && !dto.getName().isBlank())
      existing.setName(dto.getName());
    if (dto.getDescription() != null)
      existing.setDescription(dto.getDescription());
    if (dto.getDate() != null)
      existing.setDate(dto.getDate());
    if (dto.getDurationHours() != null && dto.getDurationHours() > 0)
      existing.setDurationHours(dto.getDurationHours());

    Activity updated = svc.save(existing);
    return ResponseEntity.ok(ActivityMapper.toDto(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    svc.delete(id);
    return ResponseEntity.noContent().build();
  }
}
