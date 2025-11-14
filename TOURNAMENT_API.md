# Pogon API - Tournament Management

## Database Setup

Run the `database_setup.sql` script to create all necessary tables:

```bash
psql -U your_username -d your_database -f database_setup.sql
```

## Tournament API Endpoints

### Tournaments

- **GET** `/api/tournaments` - Get all tournaments
- **GET** `/api/tournaments/active` - Get active tournaments only
- **GET** `/api/tournaments/:id` - Get tournament by ID
- **GET** `/api/tournaments/:id/statistics` - Get tournament statistics (teams, games, results count)
- **GET** `/api/tournaments/user/:userId` - Get tournaments by user ID
- **POST** `/api/tournaments` - Create tournament
  ```json
  {
    "name": "Spring Championship 2025",
    "description": "Annual spring tournament",
    "startDate": "2025-03-01",
    "endDate": "2025-03-31",
    "status": "active",
    "createdBy": 1
  }
  ```
- **PUT** `/api/tournaments/:id` - Update tournament
- **DELETE** `/api/tournaments/:id` - Delete tournament (cascades to teams, games, results)

### Results (Tournament-Filtered)

- **GET** `/api/result` - Get all results
- **GET** `/api/result/tournament/:tournamentId` - Get results by tournament
- **POST** `/api/result` - Create result
  ```json
  {
    "tournamentId": 1,
    "team1": "Team Alpha",
    "team2": "Team Beta",
    "result1": 2,
    "result2": 1,
    "status": "completed"
  }
  ```
- **PUT** `/api/result` - Update result
- **DELETE** `/api/result/:id` - Delete result

### Teams (Tournament-Filtered)

- **GET** `/api/result/teams` - Get all teams
- **GET** `/api/result/teams/tournament/:tournamentId` - Get teams by tournament
- **POST** `/api/result/teams` - Create team
  ```json
  {
    "tournamentId": 1,
    "teamName": "Team Alpha"
  }
  ```
- **DELETE** `/api/result/teams/:id` - Delete team

### Games (Tournament-Filtered)

- **GET** `/api/result/game` - Get all games
- **GET** `/api/result/game/tournament/:tournamentId` - Get games by tournament
- **POST** `/api/result/game` - Create game
  ```json
  {
    "tournamentId": 1,
    "gameName": "Quarter Final 1",
    "gameDate": "2025-03-15T14:00:00"
  }
  ```
- **PUT** `/api/result/game` - Update game

## Database Schema

### Key Changes:

1. **New Tournaments Table** - Manages tournament information
2. **TournamentId Foreign Keys** - Added to Teams, Games, and Results tables
3. **Cascade Deletes** - Deleting a tournament removes all associated teams, games, and results
4. **Parameterized Queries** - All queries now use parameterized statements to prevent SQL injection

## Migration Notes

If you have existing data, you'll need to:

1. Backup your current database
2. Create a default tournament
3. Update existing records with the default tournament ID
4. Run the new schema script

Example migration:
```sql
-- Create default tournament
INSERT INTO "Tournaments" ("Name", "Description", "Status") 
VALUES ('Legacy Data', 'Migrated from previous system', 'active') 
RETURNING "Id";

-- Update existing records (replace 1 with the returned Id)
UPDATE "Teams" SET "TournamentId" = 1;
UPDATE "Games" SET "TournamentId" = 1;
UPDATE "Results" SET "TournamentId" = 1;
```
