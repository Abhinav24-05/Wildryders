const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

const drivers = [
  { id: 1, name: 'Ava', vehicle: 'Tesla Model 3', rating: 4.9 },
  { id: 2, name: 'Noah', vehicle: 'Honda Civic', rating: 4.8 }
];

const rides = [
  { id: 1001, customer: 'Mina', pickup: 'Downtown', dropoff: 'Airport', status: 'completed' },
  { id: 1002, customer: 'Owen', pickup: 'North Gate', dropoff: 'Harbor', status: 'in_progress' }
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');

  if (req.method === 'GET' && url.pathname === '/health') {
    return sendJson(res, 200, { status: 'ok', service: 'wildryde', uptime: process.uptime().toFixed(2) });
  }

  if (req.method === 'GET' && url.pathname === '/drivers') {
    return sendJson(res, 200, { drivers });
  }

  if (req.method === 'GET' && url.pathname === '/rides') {
    return sendJson(res, 200, { rides });
  }

  if (req.method === 'POST' && url.pathname === '/rides') {
    try {
      const payload = await readBody(req);
      const ride = {
        id: Date.now(),
        customer: payload.customer || 'Guest',
        pickup: payload.pickup || 'Unknown',
        dropoff: payload.dropoff || 'Unknown',
        status: 'requested'
      };
      rides.unshift(ride);
      return sendJson(res, 201, { ride });
    } catch (error) {
      return sendJson(res, 400, { error: error.message });
    }
  }

  if (req.method === 'GET') {
    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = path.join(publicDir, requestedPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8'
      };
      const contentType = contentTypes[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(content);
    }
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Wildryde app listening on port ${PORT}`);
});
