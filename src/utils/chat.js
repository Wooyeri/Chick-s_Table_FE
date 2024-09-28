import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});
export var chat;

export const startChat = (history) => {
    if (history) {
        chat = model.startChat({history});
    } else {
        chat = model.startChat();
    }
}

export const getModelResponse = (sendMsg) => new Promise((resolve, reject) => {
    console.log(sendMsg)
    resolve(chat.sendMessage(sendMsg).then(res => {
        return res.response.text();
    }).catch(err => reject(console.error(err))));
})