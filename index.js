require("dotenv").config(); //loads env variables from .env file into process.env
const {
  Client,
  Events,
  GatewayIntentBits,
  MessageReaction,
} = require("discord.js"); //client class main entry point for interacting with discord API. represents your bot
const { OpenAI } = require("openai");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
})

client.on('messageCreate',async(message)=>{
    if(message.author.bot){return}
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages:[
            {
                // name:
                role:'system',
                content: 'ChatGPT is a friendly bot'
            },
            {
                role:'user',
                content:message.content
            }
        ]
    }).catch((error)=>console.error('openai Error:\n',error))
    message.reply(response.choices[0].message.content)
})
client.on(Events.MessageCreate, (msg) => {
  if (msg.content === "hello bot") {
    console.log(msg.author.username)
    console.log(msg.author.globalName)
    console.log(msg.content)
    msg.reply("hello babes");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
