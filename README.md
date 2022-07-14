## Todo API
#### A simple todo API with CRUD functionalities

## Tech used
- NodeJS/ExpressJS
- PostgreSQL
- Docker


## USER ENDPOINTS
```
Endpoint: {{base url}}/account/register
Method: POST
Authorization: n/a
Body: username, password
Parameters: n/a
Description: Used for User registration
```
```
Endpoint: {{base url}}/account/login
Method: POST
Authorization: n/a
Body: username, password
Parameters: n/a
Description: Used for User login, returns an access token (copy this token for later)
```
```
Endpoint: {{base url}}/account/update
Method: PUT
Authorization: Bearer token
Body: username, oldPassword, password, confirmPassword
Parameters: n/a
Description: Used for updating user's info
```
```
Endpoint: {{base url}}/account/delete
Method: DELETE
Authorization: Bearer token
Body: n/a
Parameters: n/a
Description: Used for HARD deleting the user's account
```
## TASKS ENDPOINTS
```
Endpoint: {{base url}}/tasks/mytasks
Method: GET
Authorization: Bearer token
Body: n/a
Description: Used for retrieving user's tasks
```
```
Endpoint: {{base url}}/tasks/add
Method: POST
Authorization: Bearer token
Body: task
Description: Used for adding tasks to user's list
```
```
Endpoint: {{base url}}/tasks/update?taskid={{taskid}}
Method: PUT
Authorization: Bearer token
Body: task
Parameters: taskid
Description: Used for editing tasks to user's list
```
```
Endpoint: {{base url}}/tasks/delete?taskid={{taskid}}
Method: DELETE
Authorization: Bearer token
Body: n/a
Parameters: taskid
Description: Used for HARD deleting tasks from user's list
```
```
Endpoint: {{base url}}/tasks/toggleStatus?taskid={{taskid}}
Method: PATCH
Authorization: Bearer token
Body: n/a
Parameters: taskid
Description: Used for toggling status of the specified task 
```


