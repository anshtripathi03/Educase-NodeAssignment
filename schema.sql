-- ============================================================
--  School Management API — MySQL Schema
--  Run this script once to bootstrap the database.
-- ============================================================

-- Create database (skip if it already exists)
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_management;

-- ============================================================
--  Table: schools
-- ============================================================
CREATE TABLE IF NOT EXISTS schools (
  id        INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)    NOT NULL,
  address   VARCHAR(500)    NOT NULL,
  latitude  FLOAT(10, 6)    NOT NULL,
  longitude FLOAT(10, 6)    NOT NULL,
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  -- Indexes on lat/lon speed up full-table scans when the app
  -- fetches all rows for Haversine sorting (BONUS requirement).
  INDEX idx_latitude  (latitude),
  INDEX idx_longitude (longitude),

  -- Composite index — useful if a future query filters on both columns.
  INDEX idx_lat_lon   (latitude, longitude)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Stores school location data';

-- ============================================================
--  Seed data (optional — remove in production)
-- ============================================================
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',        'Mathura Road, New Delhi, Delhi 110003',          28.5494,  77.2001),
  ('Mumbai International School','Bandra West, Mumbai, Maharashtra 400050',        19.0596,  72.8295),
  ('Bangalore Grammar School',   'Koramangala, Bangalore, Karnataka 560034',       12.9352,  77.6245),
  ('Chennai Public School',      'Anna Nagar, Chennai, Tamil Nadu 600040',         13.0850,  80.2101),
  ('Kolkata Academy',            'Park Street, Kolkata, West Bengal 700016',       22.5535,  88.3522),
  ('Hyderabad Central School',   'Banjara Hills, Hyderabad, Telangana 500034',     17.4156,  78.4347),
  ('Pune Model School',          'Shivajinagar, Pune, Maharashtra 411005',         18.5314,  73.8446),
  ('Ahmedabad Public School',    'Navrangpura, Ahmedabad, Gujarat 380009',         23.0305,  72.5595);
