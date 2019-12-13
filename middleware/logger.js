function logger() {
  const timestamp = new Date();
  console.log(`${req.method} - ${req.url} - `, timestamp.toTimeString());
  next()
};

module.exports = {
  logger
};