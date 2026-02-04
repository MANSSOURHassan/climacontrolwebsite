
-- Table: appointments
create table if not exists appointments (
  id serial primary key,
  user_id int references clients(id) on delete cascade,
  service_type varchar(50) not null, -- installation, maintenance, devis
  date date not null,
  time_slot varchar(20), -- matin, apres-midi
  status varchar(20) default 'pending', -- pending, confirmed, cancelled
  notes text,
  created_at timestamp with time zone default current_timestamp
);
