-- Table: reviews
create table if not exists reviews (
  id serial primary key,
  product_id int not null references produits(id) on delete cascade,
  user_id int references clients(id) on delete set null,
  author_name varchar(100) not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default current_timestamp
);

create index idx_reviews_product on reviews(product_id);
