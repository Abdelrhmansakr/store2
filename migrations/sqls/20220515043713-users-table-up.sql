CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(40) NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);