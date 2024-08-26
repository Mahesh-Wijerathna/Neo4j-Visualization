class ConnectionModel {
    constructor(connectionId, sourceIp, targetIp,description, status) {
        this.connectionId = connectionId;
        this.sourceIp = sourceIp;
        this.targetIp = targetIp;
        this.description = description;
        this.status = status;
    }

    static async create(connectionId, sourceIp, targetIp,  description, status) {
        const session = require('../config/db').session;
        
        const result = await session.run(
            'MATCH (source {name: $sourceIp}), (target {name: $targetIp}) CREATE (source)-[c:CONNECTION {name: $connectionId , sourceIp: $sourceIp, targetIp:$targetIp,  description: $description, status:$status } ]->(target) RETURN c',
            { connectionId, sourceIp, targetIp, description, status }
        );
        return result.records[0].get('c');
    }

    static async findByConnectionId(connectionId) {
        const session = require('../config/db').session;
        const result = await session.run(
            'MATCH c=()-[r:CONNECTION {name:$connectionId}]->() RETURN c',
            { connectionId }
        );
        return result.records.length > 0 ? result.records[0].get('c') : null;
        }

    static async updateStatus(connectionId, newStatus) {
        const session = require('../config/db').session;
        const result = await session.run(
            'MATCH ()-[r:CONNECTION {name: $connectionId}]->() SET r.status = $newStatus RETURN r',
            { connectionId, newStatus }
        );
        return result.records[0].get('r');
        }
        

    static async delete(connectionId) {
        const session = require('../config/db').session;
        await session.run(
            'MATCH ()-[c:CONNECTION {name: $connectionId}]->() DELETE c',
            { connectionId }
        );
    }

    static async getAll() {
        const session = require('../config/db').session;
        const result = await session.run(
            'MATCH c=()-[r:CONNECTION]->() RETURN c'
        );
        return result.records.map(record => record.get('c'));
    }

    static async model(){
        return "ConnectionModel is working" ;
      }
}

module.exports = ConnectionModel;