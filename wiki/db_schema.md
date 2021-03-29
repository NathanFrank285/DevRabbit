# **Database Schema**

## `users`

| column name    | data type   | details               |
| -------------- | ----------- | --------------------- |
| id             | integer     | not null, primary key |
| fullname       | string      |                       |
| username       | string      | not null, unique      |
| email          | string      | not null, unique      |
| hashedPassword | varbinary   | not null              |
| isExpert       | boolean     | not null              |
| biography      | string      |                       |
| created_at     | datetime    | not null              |
| updated-at     | datetime    | not null              |


## `tasks`

| column name    | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | not null, primary key |
| title          | string    | not null              |
| body           | text      | not null              |
| userId         | integer   | not null, foreign key |
| videoLink      | text      | not null              |
| requestedTime* | integer   | not null, foreign key |
| timesAvailable | timeStamp | not null              |
| price          | integer   | not null              |
| created_at     | datetime  | not null              |
| updated-at     | datetime  | not null              |

*time is in 15 minute intervals


## `Reviews`

| column name    | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | not null, primary key |
| reviewerId     | integer   | not null, foreign key |
| reviewedId     | integer   | not null, foreign key |
| title          | string    |                       |
| body           | text      | not null              |
| taskId         | integer   | not null, foreign key |
| created_at     | datetime  | not null              |
| updated-at     | datetime  | not null              |


## `Applied Tasks`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| expertId    | integer   | not null, foreign key |
| taskId      | integer   | not null, foreign key |
| message     | text      | not null              |
| pending     | boolean   | not null              |
| chosen      | boolean   | not null              |
| completed   | boolean   | not null              |
| created_at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

* composite unique with expertId and taskId



## `follows`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| followerId  | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

* `userId` references `users` table
* `followerId` references `users` table
* `userId` cannot equal `followerId`
