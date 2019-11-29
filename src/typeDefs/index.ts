
const { query, mutation } = require("./query"); //Method collection
const { postType, replyType } = require("./Posts");
const { authorType } = require("./Authors");

const typeDefs = [query, mutation, postType, replyType, authorType];

export { typeDefs }