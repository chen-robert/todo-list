import { Client } from "pg";
import async from "async";
import { connectionString } from "./config";

const client = new Client({ connectionString });
client.connect();

const queries = [
  "CREATE TABLE todolist_data(user_id character varying UNIQUE PRIMARY KEY, data character varying not null)"
];

async.each(
  queries,
  (query, callback) => {
    client.query(query, (err, res) => {
      console.log(err ? err.message : res.command);
      callback();
    });
  },
  err => {
    if (err) console.log(err);
    client.end();
  }
);
