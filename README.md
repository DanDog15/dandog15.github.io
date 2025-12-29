# dandog15.github.io
# 🔊 Hide and Beep

**Hide and Beep** is a mobile-first, browser-based outdoor multiplayer game inspired by hide-and-seek, enhanced with live GPS positioning, proximity-based audio beeps, and simple real-time networking via WebSockets.

One player is the **Hunter** and the others are **Hiders**. The Hunter does not see a map or player locations—instead, they rely on audio beeps that increase in frequency as they get closer to a hider.

---

## 📱 Supported Platforms

- Modern mobile browsers (Chrome, Safari, Edge)
- Requires:
  - GPS / Location services
  - Audio output
  - Optional vibration (for haptic feedback)

> Best played **outdoors** with a clear view of the sky for accurate GPS.

---

## 🎮 How to Play

### 1. Grant Permissions
When the game loads, you must accept:

- **Location access** (for distance tracking)
- **Audio access** (for beeps)

No location data is stored after the game ends.

![Permissions Screen](images/permissions.png)

---

### 2. Create or Join a Game

- **Create Game**: Start a new game room and share the generated 6-character code.
- **Join Game**: Enter an existing room code.

Each player chooses a display name.

![Home Screen](images/home.png)

---

### 3. Lobby Setup

In the lobby, the host:

- Shares the game code with other players
- Selects:
  - **Hiding time** (1–5 minutes)
  - **Hunter** (one player)

When ready, press **Start**.

![Lobby Screen](images/lobby.png)

---

### 4. Hiding Phase

- Hiders run and hide while the countdown timer runs
- The Hunter must stay put

Once the timer reaches zero, the hunt begins automatically.

![Countdown Screen](images/countdown.png)

---

### 5. Hunt Phase

#### Hunter Experience

- Sees:
  - Nearest distance to a hider (in meters)
  - A proximity meter
  - Beep interval (milliseconds)

- Hears:
  - Slow beeps when far away
  - Fast beeps when close

- Can press **Tag** if they physically find someone

#### Hider Experience

- No audio cues
- Must avoid being found

The game ends when:

- The Hunter gets within **5 meters** of a hider (auto-found)
- The Hunter presses **Tag**
- The host ends the game

![Hunt Screen](images/hunt.png)

---

### 6. Game Over

A summary is shown and players may:

- Start a **Rematch**
- **Exit** back to the home screen

![Game Over Screen](images/gameover.png)

---

## 🔊 Audio & Distance Logic

- Distance calculated using the **Haversine formula**
- GPS updates every **1 second**
- Beep frequency mapping:

| Distance (m) | Beep Interval |
|------------|--------------|
| ≥ 500      | 1500 ms      |
| ≥ 200      | 1000 ms      |
| ≥ 100      | 600 ms       |
| ≥ 20       | 400 ms       |
| < 20       | 200 ms       |

---

## 🛰️ GPS Safety & Anti-Spoofing

The game includes basic spoof detection:

- Movement > 200 m in 1 second
- Speed > 60 km/h

If detected:

- Beeps are paused
- A warning is shown

Poor GPS accuracy (> 50 m) will also temporarily pause audio cues.

---

## 🧠 Technical Overview

- **Frontend**: Single HTML file (HTML + CSS + Vanilla JavaScript)
- **Networking**: WebSocket-based (stubbed locally for demo)
- **Audio**: Web Audio API (800 Hz sine beep)
- **Location**: `navigator.geolocation.watchPosition`
- **Power Management**: Screen Wake Lock API

---

## 🚧 Known Limitations

- WebSocket backend not included (placeholder URL used)
- Local simulation used when backend is unavailable
- No persistent accounts or authentication
- Designed for small, casual groups

---

## 🚀 Future Improvements

- Map-based spectator mode
- Multiple hunters
- Obstacles or zones
- Score tracking and statistics
- Progressive Web App (PWA) packaging

---

## 📂 Project Structure

```
index.html   # Entire game (UI, logic, styles)
README.md    # This file
images/      # Screenshots for documentation
```

---

## 📜 License

This project is provided as-is for educational and experimental purposes.

