# Raketech Challenge

## How to run

### Locally

Create a .env file inside the server folder with following content:

OMDB_API_KEY=INSERT_OMDB_API_KEY_HERE

Install both dependencies in the server and client folders and run the dev script in each one of them

### Docker

Inside the .env file in the root folder replace the "INSERT_OMDB_API_KEY_HERE" with the OMDB Api key

Run the command `docker composer up --build -d`
