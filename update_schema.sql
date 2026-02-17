-- Ensure clients table has the correct columns
ALTER TABLE clients ADD COLUMN IF NOT EXISTS siret VARCHAR(14);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS type_client VARCHAR(50) DEFAULT 'particulier';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS company VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(255);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMP WITH TIME ZONE;

-- Update the check constraint if needed (drop old one first to be safe, though this is tricky in generic SQL)
-- For now, just ensuring columns exist is the priority. 
-- Make sure email allows duplicates? No, email should be unique.

-- Ensure reviews and appointments tables exist (re-run safe)
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  user_id INT REFERENCES clients(id) ON DELETE SET NULL,
  author_name VARCHAR(100) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES clients(id) ON DELETE CASCADE,
  service_type VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time_slot VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
