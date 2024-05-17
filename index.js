import { GoogleGenerativeAI } from "@google/generative-ai";
  
const API_KEY = "AIzaSyBTEr33cjlO6ex7pRL2AJFdALavVGS5oKo";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

let messages = [];

const form = document.querySelector("form");
const message = document.getElementById("message");
const chatlog = document.getElementById("chat-log");

form.addEventListener("submit", (e) => {
    e.preventDefault();
            
    async function run() {
        const prompt = message.value;

        messages.push(prompt);
                
        message.value = "";

        console.log(messages);

        const messageElementDiv = document.createElement("div");
        messageElementDiv.classList.add("message");
        messageElementDiv.classList.add("message--sent");
        messageElementDiv.innerHTML = `<div class="message__text">${prompt}</div>`;

        chatlog.appendChild(messageElementDiv);

        const waitElementDiv = document.createElement("div");
        waitElementDiv.classList.add("message");
        waitElementDiv.classList.add("message--received");
        waitElementDiv.innerHTML = `<div class="message__text">Thinking...</div>`;

        chatlog.appendChild(waitElementDiv);

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
                
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: prompt }],
                },
                {
                    role: "model",
                    parts: [{ text: '' }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
                

        const msg = prompt;
                
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();

        waitElementDiv.innerHTML = `<div class="message__text">${text}</div>`;

        chatlog.appendChild(waitElementDiv);
        }
                
    run();
})