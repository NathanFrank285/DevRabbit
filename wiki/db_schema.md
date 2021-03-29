# **Database Schema**


## `Users`

| column name    | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | not null, primary key |
| fullname       | string    |                       |
| username       | string    | not null, unique      |
| email          | string    | not null, unique      |
| hashedPassword | varbinary | not null              |
| biography      | string    |                       |
| hourlyRate     | integer   |                       |
| specialties    | string    |                       |
| videoLink      | text      | not null              |
| created_at     | datetime  | not null              |
| updated-at     | datetime  | not null              |


## `Reviews`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| clientId    | integer   | not null, foreign key |
| developerId | integer   | not null, foreign key |
| title       | string    |                       |
| body        | text      | not null              |
| taskId      | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated-at  | datetime  | not null              |


## `Current Tasks`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| clientId    | integer   | not null, foreign key |
| developerId | integer   | not null, foreign key |
| taskId      | integer   | not null, foreign key |
| message     | text      | not null              |
| startTime   | datetime  | not null              |
| endTime     | datetime  | not null              |
| pending     | boolean   | not null              |
| completed   | boolean   | not null              |
| created_at  | datetime  | not null              |
| updated-at  | datetime  | not null              |


## `Availability Table`
| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| startTime   | date      | not null              |
| endTime     | date      | not null              |
