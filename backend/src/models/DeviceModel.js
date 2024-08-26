class DeviceModel {
    constructor(ipAddress, type, description,status) {
        this.ipAddress = ipAddress;
        this.type = type;  // Router or Server
        this.description = description;
        this.status = status;
    }

    static async create(ipAddress, type, description,status) {
      try {
        console.log("ip address: ", ipAddress , "type: ", type, "description: ", description, "status: ", status);

        const session = require('../config/db').session;
        let query;
        if (type === 'SERVER') {
          query = `CREATE (d:SERVER {name: $ipAddress, description: $description, status: $status}) RETURN d`;
        } else if (type === 'ROUTER') {
          query = `CREATE (d:ROUTER {name: $ipAddress, description: $description, status: $status}) RETURN d`;
        } else {
          throw new Error('Invalid device type');
        }
        const result = await session.run(query, { ipAddress, description, status });
        return result.records[0].get('d');
    } catch (error) {
        console.log(error);
        throw error;
    } 
    
    }

    static async findAll() {
      const session = require('../config/db').session;
      const result = await session.run('MATCH (d) RETURN d');
      return result.records.map(record => record.get('d'));
    }

    static async findByIpAddress(ipAddress) {
      const session = require('../config/db').session;
      const result = await session.run(
        'MATCH (d {name: $ipAddress}) RETURN d',
        { ipAddress }
      );
      return result.records.length > 0 ? result.records[0].get('d') : null;
    }

    static async updateStatus(ipAddress, newStatus) {
      const session = require('../config/db').session;
      const result = await session.run(
        'MATCH (d {name: $ipAddress}) SET d.status = $newStatus RETURN d',
        { ipAddress, newStatus }
      );
      return result.records[0].get('d');
    }

    static async delete(ipAddress) {
      const session = require('../config/db').session;
      await session.run(
        'MATCH (d {name: $ipAddress}) DELETE d',
        { ipAddress }
      );
    }

    static async model(){
      return "DeviceModel is working" ;
    }
}


module.exports = DeviceModel;
