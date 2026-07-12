package com.statline.sports.analytics.controller;

import com.statline.sports.analytics.model.MatchEvent;
import com.statline.sports.analytics.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    // GET /api/matches -> list of all live matches with details
    @GetMapping
    public List<MatchEvent> getAllLiveMatches() {
        return matchService.getAllLiveMatches();
    }

    // GET /api/matches/{matchId} -> single match details
    @GetMapping("/{matchId}")
    public MatchEvent getMatchDetails(@PathVariable String matchId) {
        return matchService.getMatchDetails(matchId);
    }

    // GET /api/matches/{matchId}/commentary -> ball-by-ball feed
    @GetMapping("/{matchId}/commentary")
    public List<MatchEvent> getCommentary(@PathVariable String matchId) {
        return matchService.getCommentary(matchId);
    }
}