const { generateApiKey } = require('generate-api-key');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./example.json');

const server2 = jsonServer.create();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const myKey = generateApiKey({ method: 'base62' });

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

// Json Server
// server2.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   next();
// });

server2.use(jsonServer.defaults());
server2.use(jsonServer.bodyParser)
const user = router.db.get('user').value();
const username = user.username;
const password = user.password;
server2.post('/login', (req, res) => {
  let usernameInput = req.body.username;
  let passwordInput = req.body.password;  
  if (usernameInput == username && passwordInput == password) {
    res.send({ key: myKey });
  } else{
    res.send({ error: 'Invalid username or password'});
  }
  
});

server2.use(router);

server.listen(3001, ()=> { console.log('server running')})
server2.listen(3002, ()=> { 
    console.log('server2 running');    
})