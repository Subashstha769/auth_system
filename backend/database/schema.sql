-- Auth System — Database Schema
-- Stack : PHP (mysqli + prepared statements) + MySQL
-- Auth  : Session-based, passwords hashed with password_hash()
--         using PASSWORD_DEFAULT (bcrypt)

CREATE DATABASE IF NOT EXISTS auth_system
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE auth_system;

-- Table: users
-- Stores registered users. Email must be unique.
-- `password` holds a bcrypt hash — never plain text.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  reg_date  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

