package com.statline.sports.analytics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchEvent {
    private String matchId;
    private String sport;          // e.g. "CRICKET"
    private int sequenceNo;        // ordering guarantee within a match
    private String eventType;      // BALL, WICKET, MATCH_UPDATE, etc.
    private Map<String, Object> payload;
    private Instant timestamp;
}
