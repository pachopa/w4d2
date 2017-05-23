const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  client.query("SELECT * FROM famous_people WHERE (first_name = $1 OR last_name = $1)", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    finalresult(result, name);

    client.end();
  });
});

const finalresult = function(result, name){
  console.log("Found " + result.rowCount+ " person(s) by the name : " + name);
  result.rows.forEach((user,i) => {
      console.log(`- ${user.id} : ${user.first_name},${user.last_name}, born '${user.birthdate.toISOString().slice(0,10)}'`);

    })
}

