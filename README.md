# Zipper Backend

## Setup

After cloning the repo run `> npm install` in the project folder to create a node_modules folder, installing all dependencies.

Then create a nodemon.json file with the following structure:

```json
{
  "env": {
    "NODE_ENV": "dev",
    "PORT": 5000,
    "SECRET_KEY": "anything_secret",
    "DB_URL": "<a_mongo_db_uri>"
  }
}
```

## Run

In one terminal, run the development version of the app with `npm run dev`