const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    'neo4j+s://c266e885.databases.neo4j.io' || process.env.NEO4J_URI || 'neo4j://localhost',
    neo4j.auth.basic( process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'QXOpkuM9sdtcpUyvjH1WzKXs1y7f8tQ7n9DLLgVkAS8')
);

const session = driver.session();

module.exports = { driver, session };
