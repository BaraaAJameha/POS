
# POS-Tastic
 
![POS](https://github.com/user-attachments/assets/9ec230d8-c8a5-4419-b276-15f02169b2e3)

This is a small implementation of a POS system for the course Software Products Management - SWER 411

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| **environment variable** | **description**                                                                            |
| :----------------------- | :----------------------------------------------------------------------------------------- |
| `PORT`                   | the port that the project will run on                                                      |
| `HOST`                   | the (ip) address that the project will run from (usally localhost for local installations) |
| `DB_HOST`                | the (ip) address where the database is hosted                                              |
| `DB_USER`                | the user of the database                                                                   |
| `DB_PASSWORD`            | the password for that user                                                                 |
| `DB_NAME`                | the database name                                                                          |
| `JWT_SECRET`             | the secret that will be used to validate the token                                         |

## Prerequisites

1. The project requires having a MYSQL database for the database noting that in development XAMPP was used for that purpose

2. The project requires having a place to host the frontend seperatly noting that in development vscode's live server extention was used for that purpose

3. A database with the name specified in the env file to be created in mysql database  from ./Project_Data/Database

## Installation

Create a database in mysql with the name that you specified in the env file  from ./Project_Data/Database

Clone the repo from github

Once in the main directory of the project

Navigate to the backend project and install the required modules through npm using the following commands

```bash
  cd BackEnd_Project
  npm install
```

## Run Locally

once you have installed the necessary modules you need to make sure that mysql is running and then you can start the project using the following command once in the backend directory

```bash
  npm start
```

then you will need to access the frontend project by either hosting it using a server like (vscode's extention: live server) or by accessing the file directly
