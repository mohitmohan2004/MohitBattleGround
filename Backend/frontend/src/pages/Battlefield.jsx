import { useEffect, useState } from "react";
import "./Battlefield.css";

function Battlefield() {
  const [playerPosition, setPlayerPosition] = useState({
    x: 20,
    y: 52,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [ammo, setAmmo] = useState(30);
  const [shotsFired, setShotsFired] = useState(0);

  const [kills, setKills] = useState(0);
  const [message, setMessage] = useState("");

  const [bullet, setBullet] = useState(null);

  // PLAYER HEALTH
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerDead, setPlayerDead] = useState(false);

  // MULTIPLE ENEMIES
  const [enemies, setEnemies] = useState([
    {
      id: 1,
      name: "ENEMY 1",
      x: 55,
      y: 50,
      health: 100,
    },
    {
      id: 2,
      name: "ENEMY 2",
      x: 75,
      y: 30,
      health: 100,
    },
    {
      id: 3,
      name: "ENEMY 3",
      x: 70,
      y: 75,
      health: 100,
    },
    {
      id: 4,
      name: "ENEMY 4",
      x: 40,
      y: 25,
      health: 100,
    },
    {
      id: 5,
      name: "ENEMY 5",
      x: 85,
      y: 55,
      health: 100,
    },
  ]);

  // ==============================
  // PLAYER MOVEMENT + MOUSE + FIRE
  // ==============================

  useEffect(() => {
    if (playerDead) {
      return;
    }

    const speed = 2;

    function handleKeyDown(event) {
      const key = event.key.toLowerCase();

      // MOVEMENT
      if (["w", "a", "s", "d"].includes(key)) {
        setPlayerPosition((position) => {
          let { x, y } = position;

          if (key === "w") y -= speed;
          if (key === "s") y += speed;
          if (key === "a") x -= speed;
          if (key === "d") x += speed;

          x = Math.max(5, Math.min(95, x));
          y = Math.max(5, Math.min(95, y));

          return { x, y };
        });
      }

      // RELOAD
      if (key === "r") {
        setAmmo(30);
        setMessage("RELOADED");

        setTimeout(() => {
          setMessage("");
        }, 700);
      }
    }

    function handleMouseMove(event) {
      const x =
        (event.clientX / window.innerWidth) * 100;

      const y =
        (event.clientY / window.innerHeight) * 100;

      setMousePosition({
        x,
        y,
      });
    }

    function handleMouseDown(event) {
      if (event.button !== 0) {
        return;
      }

      if (ammo <= 0) {
        setMessage(
          "OUT OF AMMO — PRESS R TO RELOAD"
        );
        return;
      }

      setAmmo((currentAmmo) =>
        Math.max(0, currentAmmo - 1)
      );

      setShotsFired((shots) => shots + 1);

      // BULLET EFFECT
      setBullet({
        x: playerPosition.x,
        y: playerPosition.y,
        targetX: mousePosition.x,
        targetY: mousePosition.y,
      });

      // FIND ENEMY UNDER CROSSHAIR
      let hitEnemy = null;
      let smallestDistance = Infinity;

      enemies.forEach((enemy) => {
        if (enemy.health <= 0) {
          return;
        }

        const distance = Math.sqrt(
          Math.pow(
            mousePosition.x - enemy.x,
            2
          ) +
          Math.pow(
            mousePosition.y - enemy.y,
            2
          )
        );

        if (
          distance <= 8 &&
          distance < smallestDistance
        ) {
          smallestDistance = distance;
          hitEnemy = enemy;
        }
      });

      // DAMAGE ENEMY
      if (hitEnemy) {
        setEnemies((currentEnemies) =>
          currentEnemies.map((enemy) => {
            if (enemy.id !== hitEnemy.id) {
              return enemy;
            }

            const newHealth = Math.max(
              0,
              enemy.health - 25
            );

            if (newHealth === 0) {
              setKills((currentKills) =>
                currentKills + 1
              );

              setMessage(
                `${enemy.name} ELIMINATED!`
              );
            } else {
              setMessage(
                `${enemy.name} HIT!`
              );
            }

            return {
              ...enemy,
              health: newHealth,
            };
          })
        );
      } else {
        setMessage("MISS!");
      }

      setTimeout(() => {
        setBullet(null);
      }, 120);

      setTimeout(() => {
        setMessage("");
      }, 800);
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mousedown",
      handleMouseDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mousedown",
        handleMouseDown
      );
    };
  }, [
    ammo,
    enemies,
    mousePosition,
    playerDead,
    playerPosition,
  ]);

  // ==============================
  // ENEMY ATTACK SYSTEM
  // ==============================

  useEffect(() => {
    if (playerDead) {
      return;
    }

    const attackInterval = setInterval(() => {
      let enemyNearby = false;

      enemies.forEach((enemy) => {
        if (enemy.health <= 0) {
          return;
        }

        const distance = Math.sqrt(
          Math.pow(
            playerPosition.x - enemy.x,
            2
          ) +
          Math.pow(
            playerPosition.y - enemy.y,
            2
          )
        );

        // Enemy attack range
        if (distance <= 18) {
          enemyNearby = true;
        }
      });

      if (enemyNearby) {
        setPlayerHealth((health) => {
          const newHealth = Math.max(
            0,
            health - 10
          );

          if (newHealth === 0) {
            setPlayerDead(true);
            setMessage("YOU DIED!");
          } else {
            setMessage("ENEMY ATTACK!");

            setTimeout(() => {
              setMessage("");
            }, 500);
          }

          return newHealth;
        });
      }
    }, 1000);

    return () => {
      clearInterval(attackInterval);
    };
  }, [
    enemies,
    playerDead,
    playerPosition,
  ]);

  // ==============================
  // RESTART GAME
  // ==============================

  function restartGame() {
    setPlayerPosition({
      x: 20,
      y: 52,
    });

    setMousePosition({
      x: 50,
      y: 50,
    });

    setAmmo(30);
    setShotsFired(0);

    setKills(0);

    setPlayerHealth(100);
    setPlayerDead(false);

    setMessage("");

    setEnemies([
      {
        id: 1,
        name: "ENEMY 1",
        x: 55,
        y: 50,
        health: 100,
      },
      {
        id: 2,
        name: "ENEMY 2",
        x: 75,
        y: 30,
        health: 100,
      },
      {
        id: 3,
        name: "ENEMY 3",
        x: 70,
        y: 75,
        health: 100,
      },
      {
        id: 4,
        name: "ENEMY 4",
        x: 40,
        y: 25,
        health: 100,
      },
      {
        id: 5,
        name: "ENEMY 5",
        x: 85,
        y: 55,
        health: 100,
      },
    ]);
  }

  return (
    <div className="battlefield">

      {/* GAME UI */}

      <div className="battlefield-ui">

        <h1>
          MOHIT BATTLEGROUND
        </h1>

        <p>
          W A S D — MOVE
        </p>

        <p>
          MOUSE — AIM
        </p>

        <p>
          LEFT CLICK — FIRE
        </p>

        <p>
          R — RELOAD
        </p>

        {message && (
          <p className="game-message">
            {message}
          </p>
        )}

      </div>

      {/* PLAYER HEALTH */}

      <div className="player-health">

        <div className="health-title">
          ❤️ PLAYER HP
        </div>

        <div className="player-health-bar">

          <div
            className="player-health-fill"
            style={{
              width: `${playerHealth}%`,
            }}
          />

        </div>

        <div className="player-health-text">
          {playerHealth}/100
        </div>

      </div>

      {/* KILLS */}

      <div className="kill-counter">
        🏆 KILLS: {kills}
      </div>

      {/* CROSSHAIR */}

      <div
        className="crosshair"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      >

        <div className="crosshair-vertical" />

        <div className="crosshair-horizontal" />

      </div>

      {/* ENEMIES */}

      {enemies.map((enemy) => {

        if (enemy.health <= 0) {
          return null;
        }

        return (
          <div
            key={enemy.id}
            className="enemy"
            style={{
              left: `${enemy.x}%`,
              top: `${enemy.y}%`,
            }}
          >

            <div className="enemy-body">
              👾
            </div>

            <span>
              {enemy.name}
            </span>

            <div className="health-bar">

              <div
                className="health-fill"
                style={{
                  width: `${enemy.health}%`,
                }}
              />

            </div>

            <small>
              HP: {enemy.health}
            </small>

          </div>
        );
      })}

      {/* BULLET */}

      {bullet && (
        <div
          className="bullet"
          style={{
            left: `${bullet.targetX}%`,
            top: `${bullet.targetY}%`,
          }}
        />
      )}

      {/* PLAYER */}

      <div
        className="player"
        style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`,
        }}
      >

        <div className="player-body">
          🪖
        </div>

        <span>
          MOHIT
        </span>

      </div>

      {/* AMMO */}

      <div className="ammo-counter">
        🔫 AMMO: {ammo}/30
      </div>

      {/* SHOTS */}

      <div className="shots-counter">
        SHOTS: {shotsFired}
      </div>

      {/* ENEMY COUNT */}

      <div className="enemy-counter">
        👾 ENEMIES:{" "}
        {
          enemies.filter(
            (enemy) => enemy.health > 0
          ).length
        }
        /{enemies.length}
      </div>

      {/* COORDINATES */}

      <div className="coordinates">
        X: {playerPosition.x.toFixed(0)}
        {"  "}
        Y: {playerPosition.y.toFixed(0)}
      </div>

      {/* DEATH SCREEN */}

      {playerDead && (
        <div className="death-screen">

          <div className="death-box">

            <h1>
              ☠️ YOU DIED
            </h1>

            <p>
              MOHIT BATTLEGROUND
            </p>

            <p>
              KILLS: {kills}
            </p>

            <button
              onClick={restartGame}
              className="restart-button"
            >
              PLAY AGAIN
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Battlefield;