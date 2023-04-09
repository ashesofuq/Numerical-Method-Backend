const axios = require('axios');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./example.json');

const server2 = jsonServer.create();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const myKey = '0917320212'

const apikeyMiddleware = (req, res, next) => {
    const apiKey = req.get('api_key');
    if (!apiKey || apiKey !== myKey) {
      return res.status(401).json({ message: 'API Key Invalid' });
    }
    next();
};

server.use(jsonServer.defaults());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(apikeyMiddleware);
server.use(router);

server2.use(jsonServer.defaults());
server2.use(router);
server2.use(jsonServer.bodyParser)
const loginValue = router.db.get('login').value();
const user = router.db.get('user').value();
const usernameInput = loginValue.username;
const passwordInput = loginValue.password;
const username = user.username;
const password = user.password;

if (usernameInput == username && passwordInput == password) {
  axios.post('http://localhost:3002/login', { key:myKey })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
  
}

server.listen(3001, ()=> { console.log('server running')})
server2.listen(3002, ()=> { 
    console.log('server2 running');    
})