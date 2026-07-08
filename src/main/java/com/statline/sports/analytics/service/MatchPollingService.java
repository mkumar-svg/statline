package com.statline.sports.analytics.service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.statline.sports.analytics.client.CricApiClient;
import com.statline.sports.analytics.model.MatchEvent;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MatchPollingService {

    @Autowired
    private CricApiClient cricApiClient;

    @Autowired
    private KafkaTemplate<String, MatchEvent> kafkaTemplate;

    private static final String TOPIC = "match-events";
    private int sequenceCounter = 0;

    // Runs every 15 seconds (configurable via application.yml)
    @Scheduled(fixedDelayString = "${app.polling.interval-ms}")
    public void pollLiveMatches() {
        try {
            Map<String, Object> response = cricApiClient.fetchCurrentMatches();

            if (response == null || !"success".equals(response.get("status"))) {
                log.warn("CricAPI response was not successful: {}", response);
                return;
            }

            List<Map<String, Object>> matches = (List<Map<String, Object>>) response.get("data");
            log.info("Fetched {} matches from CricAPI", matches.size());

            for (Map<String, Object> match : matches) {
                MatchEvent event = new MatchEvent(
                        (String) match.get("id"),
                        "CRICKET",
                        sequenceCounter++,
                        "MATCH_UPDATE",
                        match,
                        Instant.now()
                );

                kafkaTemplate.send(TOPIC, event.getMatchId(), event);
                log.info("Published event for matchId={}", event.getMatchId());
            }

        } catch (Exception e) {
            log.error("Error while polling matches: {}", e.getMessage(), e);
        }
    }
}
