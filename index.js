import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const openai = new OpenAI({
    organization:"org-qzsU9lbW27jBN1GWIXz96VVS",
    apiKey:""
});

const chatCompletion = await openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[{"role":"user", "content":"Quem é você?"}]
})

console.log(chatCompletion.choices[0].message)