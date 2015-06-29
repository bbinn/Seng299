module.exports = {
	'port': process.env.PORT || 8080,
  'expiryInSeconds': 2678400,
  secure: false, // We don't have an ssl cert
	'database': 'mongodb://localhost:27017/nodeDB',
	'secret': 'seng299Group6Secret',
  'cookieName': 'seng299Group6Cookie'
};