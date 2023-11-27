CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    profile_picture_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Notes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    content TEXT,
    notebook_id INT,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Scores (
    user_id VARCHAR(255),
    notebook_id INT,
    score INT,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TagTypes (
    name VARCHAR(255) PRIMARY KEY,
    parent_type_name VARCHAR(255),
    FOREIGN KEY (parent_type_name) REFERENCES TagTypes(name) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS NotebookTags (
    notebook_id INT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    tag_type_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (notebook_id, tag, tag_type_name),
    FOREIGN KEY (notebook_id) REFERENCES Notebooks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_type_name) REFERENCES TagTypes(name) ON DELETE CASCADE
);


-- drop the tagtypes, tags, and notebook_tags tables
drop table ${NOTEBOOK_TAGS_TABLE};
drop table ${TAGS_TABLE};
drop table ${TAG_TYPES_TABLE};