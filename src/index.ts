import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { BaseOutputParser } from "langchain/schema/output_parser";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";

require("dotenv").config();

/**
 * Parse the output of an LLM call to a comma-separated list.
 */
class CommaSeparatedListOutputParser extends BaseOutputParser<string[]> {
  async parse(text: string): Promise<string[]> {
    return text.split(",").map((item) => item.trim());
  }
}

const run = async () => {
  const template = `You are a helpful assistant who generates comma separated lists.
A user will pass in a category, and you should generate 5 objects in that category in a comma separated list.
ONLY return a comma separated list, and nothing more.`;
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", humanTemplate],
  ]);

  const chatModel = new ChatOpenAI();
  const parser = new CommaSeparatedListOutputParser();
  const chain = chatPrompt.pipe(chatModel).pipe(parser);
  const result = await chain.invoke({
    "text": "fortune 500 companies"
  })
  console.log("Result: ", result);
};

run().then(() => console.log("Done!"));
