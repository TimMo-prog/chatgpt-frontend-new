module.exports = {
  apps: [{
    name: 'chatgpt',
    script: 'server.js',
    env: {
      OPENAI_API_KEY: ' ',
      // other environment variables can be added here
    },
  }],
};

