package com.mohit.battleground.match;

import com.mohit.battleground.player.Player;
import com.mohit.battleground.player.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;

    public MatchService(
            MatchRepository matchRepository,
            PlayerRepository playerRepository) {

        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
    }

    // Create Match
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    // Get All Matches
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    // Get Match By ID
    public Optional<Match> getMatchById(Long matchId) {
        return matchRepository.findById(matchId);
    }

    // Join Player to Match
    public Match joinMatch(Long matchId, Long playerId) {

        // Find Match
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() ->
                        new RuntimeException("Match not found"));

        // Find Player
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() ->
                        new RuntimeException("Player not found"));

        // Check if match is already full
        if (match.getCurrentPlayers() >= match.getMaxPlayers()) {
            throw new RuntimeException("Match is FULL. Maximum 51 players allowed.");
        }

        // Check match status
        if (!"WAITING".equals(match.getStatus())) {
            throw new RuntimeException("Match is not accepting players.");
        }

        // Add player
        match.setCurrentPlayers(match.getCurrentPlayers() + 1);

        // If 51 players reached, mark match FULL
        if (match.getCurrentPlayers() >= match.getMaxPlayers()) {
            match.setStatus("FULL");
        }

        return matchRepository.save(match);
    }
}