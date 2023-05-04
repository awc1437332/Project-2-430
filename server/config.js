require('dotenv').config();

const connections = {
    // Development
    development: {
        http: {
            port: 3000,
        },
        mongo: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        redis: process.env.REDISCLOUD_URL,
    },
    // Production
    production: {
        http: {
            port: process.env.PORT || process.env.NODE_PORT || 3000,
        },
        mongo: process.env.MONGODB_URI,
        redis: process.env.REDISCLOUD_URL,
    },
};

module.exports = {
    connections: connections[process.env.NODE_ENV],
    secret: process.env.SECRET,
}