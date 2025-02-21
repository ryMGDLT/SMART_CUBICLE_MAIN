module.exports = {
  // ... other config
  resolve: {
    fallback: {
      "console": false
    }
  },
  ignoreWarnings: [
    {
      module: /node_modules\/react-datepicker/,
    },
  ],
  // ... other config
};