const { query, mutation, publicType } = require("./query"); //Method collection
const { postType, replyType } = require("./Posts");
const { authorType } = require("./Authors");

const typeDefs = [query, mutation, publicType, postType, replyType, authorType];

export { typeDefs }