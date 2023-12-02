import { Client } from "@notionhq/client";


const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

export default async function handler(req, res) {
  try {
    const req_body = req.body
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_MESSAGE_DB },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: req_body.contact,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              text: {
                content: req_body.message,
              },
            },
          ],
        },
      },
    });
    sendTelegramMessage(req_body.contact, req_body.message)

    res.status(200).json({ data: "response" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function sendTelegramMessage(contact, message) {
  const token = process.env.TELEGRAM_BOT_API; // Replace with your actual bot token
  const chatIds = process.env.TELEGRAM_ID.split(","); // Replace with your actual chat ids

  const headers = {
    'Content-Type': 'application/json'
  };

  chatIds.forEach(chatId => {
    const payload = {
      chat_id: chatId,
      text: `New Message From Site From ${contact} \n ${message}`,
      parse_mode: 'Markdown' // Optional: if you want to style your message with Markdown
    };

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  });
}
