import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

export const getChat = async (msgs) => await openai.chat.completions.create({
    messages: [msgs.map((msg) => {
        if (msg.role == 'systemToShow') return;
        return {role: msg.role, content: msg.content};
    })],
    model: "gpt-3.5-turbo"
})