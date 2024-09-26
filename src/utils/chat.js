import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
    , dangerouslyAllowBrowser: true
});

export const getModelResponse = async (msgs) => new Promise((resolve, reject) => {
    const response = openai.chat.completions.create({
    messages: [msgs.map((msg) => {
        if (msg.role == 'systemToShow') return;
        return {role: msg.role, content: msg.content};
    })],
    model: "gpt-3.5-turbo"});

    console.log(response);

    if(response.choices && response.choices[0].finish_reason !== "stop") reject(response.choices[0])
    else resolve(response)
});