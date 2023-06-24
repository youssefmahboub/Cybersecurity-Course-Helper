const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require("langchain/llms/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { ConversationalRetrievalQAChain } = require("langchain/chains");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const mySecret = process.env['OPENAI_API_KEY']

const model = new OpenAI({
  openAIApiKey: mySecret,
  model: "text-davinci-003",
  temperature: 0.9
});

const folderPath = '../google-cybersecurity-course-content/';

const files = fs.readdirSync(folderPath);

const txtFiles = files.filter(file => file.endsWith('.txt'));
const contents = [];

for (const file of txtFiles) {
  const content = fs.readFileSync(folderPath+file);
  contents.push(content);
}

const text = contents.join('\n');
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

async function createDocs() {
  const docs = await textSplitter.createDocuments([text]);
  return docs;
}

async function startServer() {
  const docs = await createDocs();
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings({
    openAIApiKey: mySecret,
    model: "text-davinci-003"
  }));
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  function askQuestion(question) {
    return chain.call({ question, chat_history: [] });
  }
  app.get('/ask', (req, res) => {
    const question = req.query.question;
    askQuestion(question)
      .then(result => {
        const json = JSON.stringify(result);
        res.send(json);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('An error occurred');
      });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
