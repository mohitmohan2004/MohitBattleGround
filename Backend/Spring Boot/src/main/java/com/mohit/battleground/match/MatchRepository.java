package com.mohit.battleground.match;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository
        extends JpaRepository<Match, Long> {
}