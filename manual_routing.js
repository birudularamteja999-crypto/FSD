import http from 'http';

const server = http.createServer((req, res) => {

    // Create Student - POST
    // http://localhost:4000/students
    if (req.method === 'POST' && req.url === '/students') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Created</h1>');
        res.end();

    }

    // Read Students - GET
    // http://localhost:4000/students
    else if (req.method === 'GET' && req.url === '/students') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student List</h1>');
        res.end();

    }

    // Read Student by ID - GET
    // http://localhost:4000/students/1
    else if (req.method === 'GET' && req.url === '/students/1') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Details</h1>');
        res.end();

    }

    // Update Student by ID - PUT
    // http://localhost:4000/students/1
    else if (req.method === 'PUT' && req.url === '/students/1') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Updated</h1>');
        res.end();

    }

    // Delete Student by ID - DELETE
    // http://localhost:4000/students/1
    else if (req.method === 'DELETE' && req.url === '/students/1') {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Deleted</h1>');
        res.end();

    }

    // Page Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 - Not Found');
    }
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});