const { OpenAI } = require("langchain/llms/openai");
const { ChatOpenAI } = require("langchain/chat_models/openai");

require("dotenv").config();

console.log(`The API key is ${process.env.OPENAI_API_KEY}`);

const chatModel = new ChatOpenAI();

const run = async () => {
  const llm = new OpenAI({
    temperature: 0.9,
  });

  const text =
    "What would be a good company name for a company that nutrition labels";
  const llmResult = await llm.predict(text);
  const chatModelResult = await chatModel.predict(text);

  console.log("LLM Result: ", llmResult);
  console.log("Chat Model Result: ", JSON.stringify(chatModelResult, null, 2));
};

run().then(() => console.log("Done!"));
