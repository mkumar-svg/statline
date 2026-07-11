package com.statline.sports.analytics.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.statline.sports.analytics.model.MatchEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentaryService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;   // Spring Boot auto-configures this bean

    private static final int MAX_COMMENTARY_ITEMS = 200;

    public void saveLatestMatchEvent(MatchEvent event) {
        String key = "match:" + event.getMatchId() + ":latest";
        redisTemplate.opsForValue().set(key, event);
    }

    public void appendToCommentary(MatchEvent event) {
        String key = "match:" + event.getMatchId() + ":commentary";
        ListOperations<String, Object> listOps = redisTemplate.opsForList();
        listOps.leftPush(key, event);
        listOps.trim(key, 0, MAX_COMMENTARY_ITEMS - 1);
    }

    public MatchEvent getLatestMatchEvent(String matchId) {
        String key = "match:" + matchId + ":latest";
        Object raw = redisTemplate.opsForValue().get(key);
        if (raw == null) return null;
        return objectMapper.convertValue(raw, MatchEvent.class);
    }

    public List<MatchEvent> getCommentary(String matchId) {
        String key = "match:" + matchId + ":commentary";
        List<Object> rawList = redisTemplate.opsForList().range(key, 0, -1);
        if (rawList == null) return List.of();
        return rawList.stream()
                .map(item -> objectMapper.convertValue(item, MatchEvent.class))
                .collect(Collectors.toList());
    }
}
