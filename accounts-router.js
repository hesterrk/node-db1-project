const express = require("express");

const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //accounts coming from accounts.js -> table name
    const account = await db.select("*").from("accounts");
    res.json(account);

    //stretch:
    //- Add a `query string` option to your `GET /api/accounts` endpoint. The `query string` may contain `limit`, `sortby` and `sortdir` keys. If these keys are provided, use these values to limit and sort the `accounts` which are selected from the database. Reference the docs for sorting and limiting in `knex`.

    // const { limit = 10, sortby = "id", sortdir = "asc"} = query 
    // let querying = await db("accounts").orderBy(sortby, sortdir).limit(limit);
    


  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

//name -> string
//budget -> number

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    const [id] = await db("accounts").insert(payload);
    const newAccount = await db("accounts")
      .where("id", id)
      .first();
    res.json(newAccount);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    const account = await db("accounts")
      .where("id", req.params.id)
      .first();
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
