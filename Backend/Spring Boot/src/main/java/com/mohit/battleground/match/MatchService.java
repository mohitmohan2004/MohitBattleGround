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

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long matchId) {
        return matchRepository.findById(matchId);
    }

    // Player joins match
    public Match joinMatch(Long matchId, Long playerId) {

        Match match = matchRepository.findById(matchId)
                .orElseThrow(() ->
                        new RuntimeException("Match not found"));

        Player player = playerRepository.findById(playerId)
                .orElseThrow(() ->
                        new RuntimeException("Player not found"));

        if (match.getCurrentPlayers()
                >= match.getMaxPlayers()) {

            throw new RuntimeException(
                    "Match is FULL. Maximum 51 players allowed.");
        }

        if (!"WAITING".equals(match.getStatus())) {

            throw new RuntimeException(
                    "Match is not accepting players.");
        }

        match.setCurrentPlayers(
                match.getCurrentPlayers() + 1
        );

        if (match.getCurrentPlayers()
                >= match.getMaxPlayers()) {

            match.setStatus("FULL");
        }

        return matchRepository.save(match);
    }
}