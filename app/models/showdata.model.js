const sql = require("./db.js");

// constructor
const showdata = function(showdata) {
  this.image = showdata.image; 
  this.title = showdata.title;
  this.des = showdata.des; 
  this.action = showdata.action;
  this.stars = showdata.stars;
  this.date = showdata.date;
  this.year = showdata.year;
};

showdata.create = (newshowdata, result) => {
  sql.query("INSERT INTO showdata SET ?", newshowdata, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created showdata: ", { id: res.insertId, ...newshowdata });
    result(null, { id: res.insertId, ...newshowdata });
  });
};

showdata.findById = (id, result) => {
  sql.query(`SELECT * FROM showdata WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found showdata: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found showdata with the id
    result({ kind: "not_found" }, null);
  });
};

showdata.getAll = (image, result) => {
  let query = "SELECT * FROM showdata";

  if (image) {
    query += ` WHERE image LIKE '%${image}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("showdata: ", res);
    result(null, res);
  });
};

showdata.getAllPublished = result => {
  sql.query("SELECT * FROM showdata WHERE des=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("showdata: ", res);
    result(null, res);
  });
};


showdata.updateById = (id, showdata, result) => {
  sql.query(
    "UPDATE showdata SET image = ?, title = ?, des = ?, action = ?,stars = ?, date = ?, year = ? WHERE id = ?",
    [showdata.image, showdata.title, showdata.des, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found showdata with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated showdata: ", { id: id, ...showdata });
      result(null, { id: id, ...showdata });
    }
  );
};

showdata.remove = (id, result) => {
  sql.query("DELETE FROM showdata WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found showdata with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted showdata with id: ", id);
    result(null, res);
  });
};

showdata.removeAll = result => {
  sql.query("DELETE FROM showdata", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} showdata`);
    result(null, res);
  });
};

module.exports = showdata;
