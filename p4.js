const http = require('http');
const fs = require('fs');
const path = './users.json';

const getUsers = () => fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : [];

const saveUsers = (users) => fs.writeFileSync(path, JSON.stringify(users, null, 2), 'utf8');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getUsers()));
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const users = getUsers();
                const newUser = { id: users.length + 1, ...JSON.parse(body) };
                users.push(newUser);
                saveUsers(users);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON data' }));
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
        const id = parseInt(req.url.split('/')[2]);
        const users = getUsers();
        const updatedUsers = users.filter(user => user.id !== id);

        if (updatedUsers.length === users.length) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            saveUsers(updatedUsers);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
