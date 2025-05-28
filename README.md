# DrawEngine

DrawEngine is a modern web application for Magic: The Gathering players to build, track, and analyze decks. It offers advanced features such as card import, real-time filtering, pricing integration, theme customization, and detailed visual statistics. Built with React and FastAPI, and backed by a PostgreSQL database, DrawEngine is designed to support both casual play and competitive deck optimization.

## Features

- **Deck Import**  
  Load decks from `.txt` files formatted as `1x Card Name`. Automatically parsed and displayed as a scrollable, searchable list.

- **Search & Sort**  
  Instantly filter cards by name. Sort alphabetically or by total card value (quantity × price).

- **Theming & Customization**  
  Choose from Magic color identity themes or let DrawEngine auto-detect colors based on your deck.

- **Card Pricing & Metadata**  
  Live price data fetched from external sources. Hover tooltips show quantity, price, and total value. Clicking a card reveals high-res images, set info, rarity, and type.

- **Visual Deck Statistics**  
  Includes color identity breakdowns, type distributions, and mana curve histograms with interactive charts.

- **Future Features**
  - User accounts and deck syncing
  - Collection tracking
  - ML-powered card suggestions based on synergy and metadata

## Tech Stack

- Frontend: React, Tailwind CSS, Vite
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Pricing & Card Data: Scryfall API or TCGPlayer
- Charts: Chart.js or Recharts

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- PostgreSQL 14+
- Git

### Setup

**Frontend**
\`\`\`bash
cd manabase-frontend
npm install
npm run dev
\`\`\`

**Backend**
\`\`\`bash
cd manabase-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

Make sure PostgreSQL is running locally and the connection string is properly configured in your backend settings.

## Project Structure

\`\`\`
/drawengine
├── manabase-frontend/     # React + Tailwind app
└── manabase-backend/      # FastAPI + PostgreSQL server
\`\`\`

## Roadmap

- [ ] Deck import and display
- [ ] Real-time filtering and sorting
- [ ] Pricing and card preview
- [ ] Collection tracking
- [ ] User authentication
- [ ] ML-powered card suggestions

## License

This project is licensed under the MIT License.

## Contributing

Contributions, bug reports, and suggestions are welcome. Please fork the repository and submit a pull request or open an issue.
