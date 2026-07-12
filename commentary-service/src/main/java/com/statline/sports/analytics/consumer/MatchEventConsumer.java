package com.statline.sports.analytics.consumer;

import com.statline.sports.analytics.model.MatchEvent;
import com.statline.sports.analytics.service.CommentaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MatchEventConsumer {

    private final CommentaryService commentaryService;

    @KafkaListener(topics = "match-events", groupId = "commentary-service-group")
    public void consume(MatchEvent event) {
        log.info("Consumed event for matchId={}, sequenceNo={}", event.getMatchId(), event.getSequenceNo());

        commentaryService.saveLatestMatchEvent(event);
        commentaryService.appendToCommentary(event);
        commentaryService.trackLiveMatch(event.getMatchId());   

        log.info("Cached event in Redis for matchId={}", event.getMatchId());
    }
}
