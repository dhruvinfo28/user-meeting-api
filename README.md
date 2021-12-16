# user-meeting-api
An API for creating, viewing users and meetings. <br>
[Deployed Link](https://user-meeting-api.herokuapp.com/)

## Index:
  * [Endpoints](#endpoints)
  * [Run Project Locally](#localSetup)
  * [Dependencies](#depend)
  * [How to use deployed link](#deployed)

## <a name="endpoints"></a>Endpoints
### /users/new 
  * A user registration endpoint 
  * Method - POST
  * Request body example:  ``` {"username" : "TestUser"} ```  
  * Response example on status 201 (resource created ): ``` {"message": "User saved", "uid": "61bb0de9d2a1af7ec3742ef1"} ```
  * Does not allow users with same username ( i.e. no duplicate users )
  * Bad Request Example: ``` 
    {
      "username" : "TestUser"
    } ```
   * Response for above request ( TestUser already exists ) : ``` {
      "error": "Duplicate Resource"
   }```
 
### /users/all
  * Returns a list of all users as json
  * Method - GET
  * Response example on status 200 (OK) : ``` [
      {
          "uid": "61badac09c34b399e292c912",
          "username": "Test"
      },
      {
          "uid": "61bae155a3ad3c8186920cb4",
          "username": "Test2"
      },
      {
          "uid": "61bb0de9d2a1af7ec3742ef1",
          "username": "TestName"
      }
    ] ```

### /meetings/new
  * A meeting setup end point
  * Method - POST
  * Request Body example: ``` {
      "uid1":"61badac09c34b399e292c912",
      "uid2":"61bae155a3ad3c8186920cb4",
      "date": "2021:12:29"
  } ```
  * Response on status 201 : ``` {
    "meeting_uid": "61bb113bd2a1af7ec3742ef7"
  } ```
  * References user therefore not possible to create a meeting for users that are not registered
  * Bad Request example: ``` {
      "uid1":"61badac09c34b399e292c913",
      "uid2":"61bae155a3ad3c8186920cb4",
      "date": "2021:12:29"
  } ```
  * Response if such request issued: ``` { "error": "No user with uid: 61badac09c34b399e292c913 found"} ``` with status 400. Here this uid does not have a corresponding user
  * A meeting cannot have same users 
  * Bad Request example:  ``` {
      "uid1":"61bae155a3ad3c8186920cb4",
      "uid2":"61bae155a3ad3c8186920cb4",
      "date": "2021:12:29"
  } ```
  * Response if such a request is issued: ``` {
      "error": "A meeting with two same users is not possible"
  } ``` with status 400.

### /meetings/all
  * Returns all meetings info along with user info in those meetings
  * Method - GET
  * Response body on status 200 : ```
  [
      {
          "meeting_uid": "61bb06cc589cf9c365e72aa3",
          "Date": "2021:12:29",
          "user1": {
              "uid": "61bae155a3ad3c8186920cb4",
              "username": "Test2"
          },
          "user2": {
              "uid": "61badac09c34b399e292c912",
              "username": "Test"
          }
      },
      {
          "meeting_uid": "61bb113bd2a1af7ec3742ef7",
          "Date": "2021:12:29",
          "user1": {
              "uid": "61badac09c34b399e292c912",
              "username": "Test"
          },
          "user2": {
              "uid": "61bae155a3ad3c8186920cb4",
              "username": "Test2"
          }
      }
    ] ```
    
### /users/:username
   * Returns user info for username given as request parameter
   * Method - GET
   * Response example with status 200 : ``` {
       "uid": "61badac09c34b399e292c912",
       "username": "Test"
   } ``` for /users/Test
   * Returns ``` {} ``` if the requested user does not exist
    
### /meetings/updateDate
   * Updates the date of a meeting
   * Method - PATCH
   * Request body example: ``` {
     "meeting_id":"61bb06cc589cf9c365e72aa3",
     "date":"2022:01:10"
   }```
   * Response for the above request with status (200) : ``` {
     "message": "Date updated successfully"
   }```
   
### NOTE: Every end point has request data validator and throws an appropirate error for bad requests


## <a name="localSetup"></a>Run project locally 
 * Create a fork and clone the fork to your local system: ``` git clone https://github.com/<your-username>/user-meeting-api.git ```
 * Run : ``` cd user-meeting-api/ ```
 * Run : ``` yarn install ```
 * Open a new terminal window and start a local mongo server instance : In your terminal type : ``` mongod ```
 * Start the express server using initial terminal: ``` yarn start ```
 * Check Api status on ``` http://localhost:3000/ ``` 
 * Base URL : ``` http://localhost:3000/ ```
 * The above guide assumes node.js, yarn and mongodb installed on your machine

## <a name="depend"></a>Dependencies 
 #### express
 #### zod : Zod is a TypeScript-first schema declaration and validation library.
  * Declare a validator once and Zod will automatically infer the static TypeScript type.
  * Developer friendly
  * Zero dependencies
 #### cors : Provides shorthand to enable Cross-Origin Resource Sharing
 #### morgan : For easy logging
 #### dotenv : To load environment variable from a .env file
 #### ts-node : Lets us run TypeScript files directly from the shell as ts-node <file-name>
 
## <a name="deployed"></a>To use deployed link for making requests: 
 * Use the base url and append the above given endpoints
 * Example: https://user-meeting-api.herokuapp.com/users/all
