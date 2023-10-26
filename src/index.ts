import { OpenAI } from "langchain/llms/openai";

require("dotenv").config();

console.log("Hello World!")
console.log(`The API key is ${process.env.OPEN_AI_API_KEY}`)