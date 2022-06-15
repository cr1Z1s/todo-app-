CREATE TABLE users(
	user_id UUID DEFAULT uuid_generate_v4(),
  is_super_admin BOOLEAN NOT NULL,
  user_firstname VARCHAR(50) NOT NULL,
  user_lastname  VARCHAR(50) NOT NULL,
 	username  VARCHAR(50) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE todo(
  todo_id UUID DEFAULT uuid_generate_v4(),
  todo_text TEXT NOT NULL,
  todo_done BOOLEAN NOT NULL,
  created_at DATE NOT NULL,
  user_id UUID NOT NULL,
	PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE note(
  note_id UUID DEFAULT uuid_generate_v4(),
  note_text TEXT NULL,
  todo_id UUID NOT NULL,
	PRIMARY KEY (note_id),
  FOREIGN KEY (todo_id) REFERENCES todo(todo_id)
);