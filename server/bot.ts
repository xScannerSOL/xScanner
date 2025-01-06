import TelegramBot from 'node-telegram-bot-api';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set');
}

console.log('Starting Telegram bot initialization...');
console.log('Bot token length:', process.env.TELEGRAM_BOT_TOKEN.length, 'characters');

// Initialize the bot with debug mode
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { 
  polling: true,
  filepath: false, // Disable file download for security
  webHook: false // Explicitly disable webhook mode
});

// Helper function to format analysis results for Telegram
function formatAnalysisResults(data: any): string {
  const parts = [
    `📊 Analysis Results for @${data.username}`,
    `${data.verified ? '✅ Verified Account' : '⚠️ Unverified Account'}`,
  ];

  if (data.name) {
    parts.push(`👤 Display Name: ${data.name}`);
  }

  if (data.created_at) {
    parts.push(`📅 Account Created: ${new Date(data.created_at).toLocaleDateString()}`);
  }

  if (data.description) {
    parts.push(`📝 Bio: ${data.description}`);
  }

  // Add Recent name changes
  const nameChanges = data.recentNameChanges?.length ? data.recentNameChanges.join(', ') : 'None';
  parts.push(`📎 Recent name changes: ${nameChanges}`);

  parts.push(`🎯 Confidence Score: ${data.confidence}%`);

  if (data.note) {
    parts.push(`📌 Note: ${data.note}`);
  }

  return parts.join('\n\n');
}

// Basic message handler to log all incoming messages
bot.on('message', (msg) => {
  console.log('DEBUG - Received message:', {
    message_id: msg.message_id,
    chat_id: msg.chat.id,
    text: msg.text,
    type: msg.chat.type,
    date: new Date(msg.date * 1000).toISOString()
  });
});

// Command handler for /start and /analyze
bot.on('text', (msg) => {
  if (!msg.text) return;

  const chatId = msg.chat.id;
  console.log(`DEBUG - Processing message: ${msg.text} from chat ${chatId}`);

  if (msg.text === '/start') {
    console.log('DEBUG - Handling /start command');
    bot.sendMessage(
      chatId,
      `👋 Welcome to xCheck Bot!\n\n` +
      `I can help you analyze social media accounts and provide detailed insights.\n\n` +
      `To analyze an account, use the /analyze command followed by a username:\n` +
      `Example: /analyze twitter`
    ).then(() => {
      console.log('DEBUG - Start message sent successfully');
    }).catch(error => {
      console.error('DEBUG - Error sending start message:', error);
    });
  } else if (msg.text.startsWith('/analyze')) {
    console.log('DEBUG - Handling /analyze command');
    const username = msg.text.split('/analyze').pop()?.trim();

    if (!username) {
      bot.sendMessage(chatId, '❌ Please provide a username to analyze.\nExample: /analyze twitter')
        .then(() => console.log('DEBUG - Sent usage instruction for analyze command'))
        .catch(error => console.error('DEBUG - Error sending usage instruction:', error));
      return;
    }

    console.log(`DEBUG - Analyzing username: ${username}`);
    bot.sendChatAction(chatId, 'typing')
      .then(() => {
        return fetch('http://0.0.0.0:5000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('DEBUG - Analysis data received:', data);
        const formattedMessage = formatAnalysisResults(data);
        return bot.sendMessage(chatId, formattedMessage);
      })
      .then(() => {
        console.log('DEBUG - Analysis results sent successfully');
      })
      .catch(error => {
        console.error('DEBUG - Error in analyze command:', error);
        bot.sendMessage(
          chatId,
          '❌ Sorry, I encountered an error while analyzing this account. Please try again later.'
        ).catch(err => console.error('DEBUG - Error sending error message:', err));
      });
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('DEBUG - Telegram Bot polling error:', error);
});

// Handle errors globally
process.on('unhandledRejection', (error) => {
  console.error('DEBUG - Unhandled promise rejection:', error);
});

// Verify bot token on startup
bot.getMe()
  .then(botInfo => {
    console.log('Bot verification successful:', {
      id: botInfo.id,
      username: botInfo.username,
      first_name: botInfo.first_name
    });
  })
  .catch(error => {
    console.error('Bot verification failed:', error.message);
    process.exit(1); // Exit if bot token is invalid
  });

// Export the bot instance
export const telegramBot = bot;