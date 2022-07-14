CREATE TABLE IF NOT EXISTS tasks
(
    taskID SERIAL,
    accID text,
    task text,
    status boolean,
    CONSTRAINT tasks_pkey PRIMARY KEY (taskID)
);

CREATE TABLE IF NOT EXISTS users
(
    accID SERIAL,
    username text,
    password text,
    CONSTRAINT users_pkey PRIMARY KEY (accID)
);

INSERT INTO users(username, password) VALUES
 ('admin', 'admin');

INSERT INTO tasks(accID, task, status) VALUES
(1, 'do something', false);