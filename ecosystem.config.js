module.exports = {
  apps: [{
    name: 'chatgpt',
    script: 'server.js',
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  }],
};

