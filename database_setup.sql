-- PostgreSQL Database Setup Script for Pogon API
-- This script creates all necessary tables and procedures for the application

-- Drop existing tables if they exist (in correct order due to dependencies)
DROP TABLE IF EXISTS "Results" CASCADE;
DROP TABLE IF EXISTS "scripts" CASCADE;
DROP TABLE IF EXISTS "scriptsCat" CASCADE;
DROP TABLE IF EXISTS "Teams" CASCADE;
DROP TABLE IF EXISTS "Games" CASCADE;
DROP TABLE IF EXISTS "Tournaments" CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop procedures if they exist
DROP PROCEDURE IF EXISTS insert_user_if_not_exists;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    reset INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    "createDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- TOURNAMENTS TABLE
-- ============================================
CREATE TABLE "Tournaments" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(255) NOT NULL,
    "Description" TEXT,
    "StartDate" TIMESTAMP,
    "EndDate" TIMESTAMP,
    "Status" VARCHAR(50) DEFAULT 'active',
    "CreatedBy" INTEGER,
    "CreateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("CreatedBy") REFERENCES users(id) ON DELETE SET NULL
);

-- Create index on status for faster filtering
CREATE INDEX idx_tournaments_status ON "Tournaments"("Status");
CREATE INDEX idx_tournaments_createdBy ON "Tournaments"("CreatedBy");

-- ============================================
-- TEAMS TABLE
-- ============================================
CREATE TABLE "Teams" (
    "Id" SERIAL PRIMARY KEY,
    "TournamentId" INTEGER NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "CreateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("TournamentId") REFERENCES "Tournaments"("Id") ON DELETE CASCADE
);

-- Create index on tournamentId for faster lookups
CREATE INDEX idx_teams_tournamentId ON "Teams"("TournamentId");

-- ============================================
-- GAMES TABLE
-- ============================================
CREATE TABLE "Games" (
    "Id" SERIAL PRIMARY KEY,
    "TournamentId" INTEGER NOT NULL,
    "GameName" VARCHAR(255),
    "GameDate" TIMESTAMP,
    "CreateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("TournamentId") REFERENCES "Tournaments"("Id") ON DELETE CASCADE
);

-- Create index on tournamentId for faster lookups
CREATE INDEX idx_games_tournamentId ON "Games"("TournamentId");

-- ============================================
-- RESULTS TABLE
-- ============================================
CREATE TABLE "Results" (
    "Id" SERIAL PRIMARY KEY,
    "TournamentId" INTEGER NOT NULL,
    "Team1" VARCHAR(255) NOT NULL,
    "Team2" VARCHAR(255) NOT NULL,
    "Result1" INTEGER DEFAULT 0,
    "Result2" INTEGER DEFAULT 0,
    "Status" VARCHAR(50) DEFAULT 'pending',
    "CreateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("TournamentId") REFERENCES "Tournaments"("Id") ON DELETE CASCADE
);

-- Create index on tournamentId for faster lookups
CREATE INDEX idx_results_tournamentId ON "Results"("TournamentId");

-- ============================================
-- SCRIPTS CATEGORIES TABLE
-- ============================================
CREATE TABLE "scriptsCat" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    "createDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create index on userId for faster lookups
CREATE INDEX idx_scriptsCat_userId ON "scriptsCat"("userId");

-- ============================================
-- SCRIPTS TABLE
-- ============================================
CREATE TABLE scripts (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    name VARCHAR(255) NOT NULL,
    script TEXT NOT NULL,
    "createDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY ("categoryId") REFERENCES "scriptsCat"(id) ON DELETE SET NULL
);

-- Create indexes for faster lookups
CREATE INDEX idx_scripts_userId ON scripts("userId");
CREATE INDEX idx_scripts_categoryId ON scripts("categoryId");

-- ============================================
-- STORED PROCEDURES
-- ============================================

-- Procedure to insert user if not exists
CREATE OR REPLACE PROCEDURE insert_user_if_not_exists(
    IN p_login VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_pass VARCHAR(255),
    INOUT p_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if user with this email already exists
    SELECT id INTO p_id FROM users WHERE email = p_email;
    
    -- If user doesn't exist, insert new user
    IF p_id IS NULL THEN
        INSERT INTO users (login, email, pass, "createDate", "updateDate")
        VALUES (p_login, p_email, p_pass, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id INTO p_id;
    END IF;
END;
$$;

-- ============================================
-- SAMPLE DATA (Optional - comment out if not needed)
-- ============================================

-- Sample users
INSERT INTO users (login, email, pass) VALUES 
    ('admin', 'admin@example.com', 'admin123'),
    ('testuser', 'test@example.com', 'test123');

-- Sample tournaments
INSERT INTO "Tournaments" ("Name", "Description", "StartDate", "EndDate", "Status", "CreatedBy") VALUES 
    ('Spring Championship 2025', 'Annual spring tournament', '2025-03-01', '2025-03-31', 'active', 1),
    ('Summer Cup 2025', 'Summer competition', '2025-06-01', '2025-06-30', 'active', 1);

-- Sample teams (linked to tournaments)
INSERT INTO "Teams" ("TournamentId", "Name") VALUES 
    (1, 'Team Alpha'),
    (1, 'Team Beta'),
    (1, 'Team Gamma'),
    (1, 'Team Delta'),
    (2, 'Team Phoenix'),
    (2, 'Team Dragon');

-- Sample games (linked to tournaments)
INSERT INTO "Games" ("TournamentId", "GameName", "GameDate") VALUES 
    (1, 'Quarter Final 1', '2025-03-15 14:00:00'),
    (1, 'Quarter Final 2', '2025-03-15 16:00:00'),
    (2, 'Semi Final 1', '2025-06-20 14:00:00');

-- Sample script categories
INSERT INTO "scriptsCat" ("userId", name, description) VALUES 
    (1, 'Utilities', 'General utility scripts'),
    (1, 'Reports', 'Reporting scripts');

-- Sample results (linked to tournaments)
INSERT INTO "Results" ("TournamentId", "Team1", "Team2", "Result1", "Result2", "Status") VALUES 
    (1, 'Team Alpha', 'Team Beta', 0, 0, 'pending'),
    (1, 'Team Gamma', 'Team Delta', 0, 0, 'pending'),
    (2, 'Team Phoenix', 'Team Dragon', 0, 0, 'pending');

-- ============================================
-- GRANT PERMISSIONS (adjust username as needed)
-- ============================================
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_db_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_db_user;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the setup:
-- SELECT * FROM users;
-- SELECT * FROM "Teams";
-- SELECT * FROM "Games";
-- SELECT * FROM "Results";
-- SELECT * FROM "scriptsCat";
-- SELECT * FROM scripts;
