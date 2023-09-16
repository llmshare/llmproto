import PouchDB from "pouchdb";

const db = new PouchDB("http://localhost:5984/llmshare");

export default db;
