const connectionName = process.env.INSTANCE_CONNECTION_NAME;

const Knex = require('knex');
const knex = Knex({
    client: 'pg',
    connection: {
        host : `/cloudsql/${connectionName}`,
        user : 'postgres',
        password : process.env.POSTGRES_PASSWORD,
        database : 'postgres'
    }
}); 

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.handler = async (req, res) => {
    // Respond to CORS preflight requests
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', ['GET','POST']);
        res.set('Access-Control-Allow-Headers', ['Content-Type','access-control-allow-origin']);
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');        
    }
    
    const SqlString = require('sqlstring');
    
    let response = {
        messages: [],
        error: null,
    }
    if (req.method === 'POST') {
        const inboundMessage = req.body;
        const id = Number(SqlString.escape(inboundMessage.id));
        const msg = String(SqlString.escape(inboundMessage.msg).replace(/["']/g, ""));
        const userid = String(SqlString.escape(inboundMessage.userId).replace(/["']/g, ""));
        const avatarurl = String(SqlString.escape(inboundMessage.avatarUrl).replace(/["']/g, ""));
        const messages = 
            await knex.insert({id, msg, avatarurl, userid})
                      .into('messages')
                      .then(() => {
                          return knex.select('*')
                                     .from('messages')
                                     .orderBy('id')
                      }).catch(console.log);
         
        response.messages = messages;    
    }

    if (req.method === 'GET') {
        const messages = 
            await knex.select('*')
                      .from('messages')
                      .orderBy('id')
                      .catch(console.log);
         
        response.messages = messages;    
    }

    res.status(200).json(response);
  };

