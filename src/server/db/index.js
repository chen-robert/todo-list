import { Client } from "pg";
import { connectionString } from "./config";

const client = new Client({ connectionString });
client.connect();

const handleError = (err, callback) => {
  console.error(err);
  callback("Unknown error");
};
export const saveState = (name, data, callback) => {
  client
    .query("DELETE FROM todolist_data WHERE user_id = $1 RETURNING *", [name])
    .then(() =>
      client.query(
        "INSERT INTO todolist_data(user_id, data) VALUES($1, $2) RETURNING *",
        [name, data]
      )
    )
    .then(() => callback())
    .catch(err => handleError(err, callback));
};

export const getSaveData = (name, callback) => {
  client
    .query("SELECT * FROM todolist_data WHERE user_id = $1", [name])
    .then(res => {
      if (res.rows.length === 0) {
        return callback(null, { data: null });
      }
      const data = res.rows[0];
      return callback(null, { data: data.data });
    })
    .catch(err => handleError(err, callback));
};
