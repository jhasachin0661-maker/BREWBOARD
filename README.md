# BREWBOARD — The Coffee Journal

> **Discover. Taste. Rate.**  
> A client-side specialty coffee discovery and rating single-page web application.

---

## ☕ 1. Executive Summary

**BREWBOARD** is an interactive, responsive coffee journal designed for coffee lovers, students, and professionals to explore diverse roasting methods, analyze detailed sensory tasting notes, and vote for their favorite coffee varieties.

The application is intentionally engineered **without a backend server, database, or external APIs**. All catalogue data is statically bundled with the frontend, and individual user votes are stored persistently in the user's browser using `LocalStorage`.

---

## 🎨 2. Design System & Visual Identity

Following the design specification in the Product Requirements Document:

| Design Token | Hex Code | Purpose |
|---|---|---|
| **Espresso Black** | `#211A17` | Primary text, deep surfaces, dark button accents |
| **Warm Cream** | `#F4EBDD` | Main canvas and page background |
| **Coffee Brown** | `#75513D` | Headings, secondary accents, borders |
| **Muted Sage** | `#89927A` | Subtle category tags, badges, status highlights |
| **Burnt Orange** | `#C47B4D` | Active highlights, vote buttons, interactive details |

### Typography
- **Headings**: *Playfair Display* (Editorial serif)
- **Body**: *Inter* (Clean sans-serif)
- **Statistics & Metadata**: *Space Grotesk* (Monospace tabular numbers and compact chips)

---

## 🚀 3. Technical Architecture & Tech Stack

- **Framework**: React 18 (Component-based architecture)
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS 3 with custom brand theme tokens
- **Routing**: React Router DOM 6 (Client-side SPA navigation)
- **Icons**: Lucide React
- **Persistence**: Browser `LocalStorage` (`brewboard_votes` key)
- **Data Model**: Immutable JavaScript catalogue (`src/data/coffees.js`)

### State Flow Architecture
```text
User Interaction (Click Vote / Search / Filter)
       │
       ▼
React State (VoteProvider Context)
       │
       ├──► LocalStorage Persistence (`brewboard_votes`)
       │
       └──► Derived State Calculation (initialVotes + activeVote)
       │
       ▼
Synchronized UI Re-render + Accessible Toast Feedback
```

---

## 📋 4. Features & Functionality

### 1. Discovery Dashboard (`/`)
- Editorial Hero section with live aggregated metrics (Curated Roasts, Total App Votes, Personal Active Votes).
- Number #1 trending coffee spotlight of the day.
- Curator's spotlight featuring signature brewing methods.
- Categorical navigation pills for one-click exploration.

### 2. Catalogue Explorer (`/explore`)
- Instant multi-field search (matches coffee name, description, origin, roast, or flavor notes).
- Category filtering: *Espresso, Milk Coffee, Brewed Coffee, Cold Coffee, Specialty, Traditional*.
- Temperature filtering: *All, Hot, Cold*.
- Caffeine level filtering: *All, Low, Medium, High*.
- Multi-criteria sorting: *Most Voted, Least Voted, Alphabetical (A–Z), Alphabetical (Z–A), Recently Added*.
- Active filter badges with individual dismiss controls and *Reset All*.

### 3. My Favourites (`/favorites`)
- Displays all coffee varieties voted for in the current browser session.
- Automatic breakdown of your personal tasting preferences.
- Direct vote removal / unvote interaction.
- Empty state with guide to explore and bookmark coffees.
- Safe "Clear Local Votes" option.

### 4. Coffee Details View (`/coffee/:id`)
- High-resolution SVG coffee artwork and temperature/category badges.
- Origin, roast profile, portion volume, and caloric estimates.
- Sensory tasting notes chips (e.g. Dark Chocolate, Caramel, Orange Zest).
- Preparation recipes, equipment, and ingredient breakdown.
- Prominent interactive voting console with live vote count and status.
- Share link action with toast notification.
- Complementary recommendations list.

---

## 🔒 5. LocalStorage Contract & Resilience

- **Storage Key**: `brewboard_votes`
- **Data Structure**: `{ [coffeeId: string]: true }`
- **Derived Count Formula**: `displayedVotes = initialVotes + (votedItems[coffee.id] ? 1 : 0)`
- **Safety Mechanisms**:
  - Validates and sanitizes JSON payload on boot.
  - Automatically recovers to an empty voting map if corrupted JSON or non-object payloads are detected.
  - Detects storage restrictions/quota errors gracefully, keeping all actions functional in memory with a friendly alert banner.

---

## 🛠️ 6. Getting Started & Testing

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Automated Unit & Integration Tests
```bash
npm test
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT. Created as an implementation of the BREWBOARD PRD & TRD specifications.

