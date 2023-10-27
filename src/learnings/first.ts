import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";

require("dotenv").config();

// console.log(`The API key is ${process.env.OPENAI_API_KEY}`);

const llm = new OpenAI({
  temperature: 0.9,
});
const chatModel = new ChatOpenAI();

const run = async () => {
  const example1UsingPredict = async () => {
    const text =
      "What would be a good company name for a company that nutrition labels";
    const llmResult = await llm.predict(text);
    const chatModelResult = await chatModel.predict(text);

    console.log("LLM Result: ", llmResult);
    console.log(
      "Chat Model Result: ",
      JSON.stringify(chatModelResult, null, 2)
    );
  };

  const example2UsingPredictMessages = async () => {
    const text =
      "What would be a good company name for a company that nutrition labels";
    const messages = [new HumanMessage({ content: text })];
    const llmResult = await llm.predictMessages(messages);
    const chatModelResult = await chatModel.predictMessages(messages);

    console.log("LLM Result: ", llmResult);
    console.log(
      "Chat Model Result: ",
      JSON.stringify(chatModelResult, null, 2)
    );
  };

  const example3WithPrompts = async () => {
    const prompTemplate = PromptTemplate.fromTemplate(
      "What would be a good company name for a company that makes {product}"
    );
    const formattedPrompt = await prompTemplate.format({
      product: "nutrition labels",
    });
    console.log("Formatted Prompt: ", formattedPrompt);
  };

  const example4PromptTemplateMessages = async () => {
    const template =
      "You are a helpful assistant that translates {input_language} into {output_language}.";
    const humanTemplate = "{text}";

    const chatPrompt = ChatPromptTemplate.fromMessages([
      ["system", template],
      ["human", humanTemplate],
    ]);

    const formattedChatPrompt = await chatPrompt.formatMessages({
      input_language: "English",
      output_language: "Hindi",
      text: "I love programming.",
    });

    console.log("Formatted Chat Prompt: ", formattedChatPrompt);
  };

  //   await example1UsingPredict();
  //   await example2UsingPredictMessages();
  //   await example3WithPrompts();
    await example4PromptTemplateMessages();
};

run().then(() => console.log("Done!"));
