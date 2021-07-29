module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mongo: {
      endpoint: process.env.MONGO_URI,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
