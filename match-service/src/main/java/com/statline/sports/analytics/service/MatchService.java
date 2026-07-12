package com.statline.sports.analytics.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.statline.sports.analytics.model.MatchEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String LIVE_MATCHES_SET = "live-matches";

    public List<String> getAllLiveMatchIds() {
        var members = redisTemplate.opsForSet().members(LIVE_MATCHES_SET);
        if (members == null) return List.of();
        return members.stream().map(Object::toString).collect(Collectors.toList());
    }

    public MatchEvent getMatchDetails(String matchId) {
        String key = "match:" + matchId + ":latest";
        Object raw = redisTemplate.opsForValue().get(key);
        if (raw == null) return null;
        return objectMapper.convertValue(raw, MatchEvent.class);
    }

    public List<MatchEvent> getAllLiveMatches() {
        return getAllLiveMatchIds().stream()
                .map(this::getMatchDetails)
                .filter(m -> m != null)
                .collect(Collectors.toList());
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