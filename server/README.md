# Server endpoints

| Method | Endpoint         | Description                                                                                                                           |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/signup`        | Inserts a new user into the database.                                                                                                 |
| POST   | `/login`         | Checks the email and password entered against all db users. If match exists, user is redirected to their dashboard.                   |
| POST   | `/getUser`       | Returns user's `_id`, `name` and `email` and sets those values in UserContext.                                                        |
| POST   | `/getModules`    | Returns all of the user's modules data and sets that data into the specified module context.                                          |
| POST   | `/cashflow`      | Calculates the user's Cash flow score, inserts the user's data into the db and finally returns the results and original inputs.       |
| POST   | `/emergencyfund` | Calculates the user's Emergency fund score, inserts the user's data into the db and finally returns the results and original inputs.  |
| POST   | `/debt`          | Calculates the user's Debt management score, inserts the user's data into the db and finally returns the results and original inputs. |
| POST   | `/addGoal`       | Inserts the user's goal data into the db and returns the `estimatedDate` and `goalStatus` for the new goal.                           |
| POST   | `/updateGoal`    | Updates the user's goal data in the db and returns the updated `estimatedDate` and `goalStatus` for the specified goal.               |
| DELETE | `/deleteGoal`    | Removes the specified goal from the goals module in the db.                                                                           |
