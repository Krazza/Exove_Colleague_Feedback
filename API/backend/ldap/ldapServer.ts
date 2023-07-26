import { Express } from 'express';
import express from 'express';
import * as ldap from 'ldapjs';
import cors from 'cors';
import { SearchEntryObject, SearchOptions} from 'ldapjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const app: Express = express();

app.use(cors());
app.use(express.json());

interface LoginRequest {
  username: string;
  password: string;
}

interface LdapUser {
    role: string;
    username: string;
    email: string;
    id: string;
    phoneNumber: string;
    groupId: string;
    imagePath: string;
}

const createNewClient = () => {
  const client = ldap.createClient({
    url: 'ldap://localhost:389',
  });
  return client;
};

const generateJwtToken = (payload: object) => {
  const secretKey = process.env.JWT_SECRET || 'default_secret_key';
  const token = jwt.sign(payload, secretKey);
  return token;
};

app.post('/auth', (req: express.Request<{}, {}, LoginRequest>, res) => {
  const { username, password } = req.body as { username: string, password: string };
  console.log(`${username} is trying to login with ${password} as a pwd`);
  const client = createNewClient();

  const bindDN = `uid=${username},ou=People,dc=test,dc=com`;

  client.bind(bindDN, password, (err: Error | null) => {
    if (err) {
      console.error(err);
      res.status(401).send('Authentication failed');
      return;
    }

    const searchOptions: SearchOptions = {
        scope: 'sub',
        filter: `(&(uid=${username})(objectClass=posixAccount))`, // add objectClass filter
        attributes: ['cn','uid', 'uidNumber', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber' ],
      };

      client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err: Error | null, result: ldap.SearchCallbackResponse) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving user info');
          return;
        }
    
        const userAttributes: SearchEntryObject[] = [];
    
        result.on('searchEntry', (entry) => {
          const user: Record<string, any> = {};
          entry.attributes.forEach((attribute) => {
            const key = attribute.type;
            const values = attribute.vals as string[];
            const value = values.join(', '); 
            user[key] = value;
          });
          userAttributes.push(user as SearchEntryObject);
        });
    
        result.on('end', () => {
          console.log("authentication successfull");
          const userData = userAttributes[0];
    
          const payload = { 
            user: { 
              role: userData.description,
              username: userData.cn,
              email: userData.mail,
              id: userData.uidNumber,
              phoneNumber: userData.telephoneNumber,
              groupId: userData.gidNumber,
              imagePath: userData.jpegPhoto,
            } as LdapUser,
          };
          console.log("payload", payload);
          const token = generateJwtToken(payload);
          console.log('token', token);

            res.status(200).send({
              message: 'Authentication successful',
              user: userAttributes[0],
              token: token
            });
        });
      });
  });
});

// Start the server
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});