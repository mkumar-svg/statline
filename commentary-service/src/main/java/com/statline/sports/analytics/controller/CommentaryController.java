package com.statline.sports.analytics.controller;

import com.statline.sports.analytics.model.MatchEvent;
import com.statline.sports.analytics.service.CommentaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class CommentaryController {

    private final CommentaryService commentaryService;

    @GetMapping("/{matchId}/latest")
    public MatchEvent getLatest(@PathVariable String matchId) {
        return commentaryService.getLatestMatchEvent(matchId);
    }

    @GetMapping("/{matchId}/commentary")
    public List<MatchEvent> getCommentary(@PathVariable String matchId) {
        return commentaryService.getCommentary(matchId);
    }
}

