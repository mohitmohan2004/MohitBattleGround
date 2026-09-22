package com.mohit.battleground.player;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository
        extends JpaRepository<Player, Long> {
}