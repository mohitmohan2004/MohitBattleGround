package com.mohit.battleground.match;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    // Create Match
    @PostMapping
    public Match createMatch(@RequestBody Match match) {
        return matchService.createMatch(match);
    }

    // Get All Matches
    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    // Get Match By ID
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Join Match
    @PostMapping("/{matchId}/join")
    public ResponseEntity<?> joinMatch(
            @PathVariable Long matchId,
            @RequestParam Long playerId) {

        try {
            Match match = matchService.joinMatch(matchId, playerId);
            return ResponseEntity.ok(match);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}