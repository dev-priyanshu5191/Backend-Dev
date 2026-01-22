const http = require('http');
const fs = require('fs');
let students = [
    { id: 1, name: 'Anil' },
    { id: 2, name: 'Walt' },
    { id: 3, name: 'Sidhu' },
    { id: 4, name: "Henk" }
];
http.createServer((req, resp) => {
    fs.appendFileSync(
        'log.txt',
        `${new Date().toISOString()} ${req.method} ${req.url}\n`
    );
    resp.setHeader("Content-Type", "application/json");
    if(req.url == '/'){
        resp.write("Your Page Worked Successfully")
    }
    if (req.method === 'GET' && req.url == "/students") {
        resp.write(JSON.stringify(students));
    }
    else if (req.method === 'GET' && req.url.startsWith('/students/')) {
        const id = Number(req.url.split('/')[2]);
        const student = students.find(s => s.id === id);

        if (student) {
            resp.end(JSON.stringify(student));
        } 
        // else {
        //     resp.statusCode = 404;
        //     resp.end(JSON.stringify({ msg: 'Student Not found' }));
        // }
    }
    else if (req.method === 'POST' && req.url === '/students') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const newStudent = JSON.parse(body);
            newStudent.id = students.length + 1;
            students.push(newStudent);
        })
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/students/')) {
        const id = Number(req.url.split('/')[2]);
        students = students.filter(s => s.id !== id);
        resp.end(JSON.stringify({ msg: 'Student deleted' }));
    }
    // else {
    //     resp.statusCode = 404;
    //     resp.end(JSON.stringify({ msg: 'Route not found' }));
    // }
    resp.end()
}).listen(4000, () => {
    console.log("Server running on port 4000");
});


// const http = require('http');
// const fs = require('fs');

// let students = [
//   { id: 1, name: 'Anil' },
//   { id: 2, name: 'Walt' },
//   { id: 3, name: 'Sidhu' },
//   { id: 4, name: 'Henk' }
// ];

// http.createServer((req, res) => {

//   fs.appendFileSync(
//     'log.txt',
//     `${new Date().toISOString()} ${req.method} ${req.url}\n`
//   );

//   res.setHeader('Content-Type', 'application/json');

//   // ✅ GET ALL
//   if (req.method === 'GET' && req.url === '/students') {
//     res.end(JSON.stringify(students));
//     return;
//   }

//   // ✅ GET BY ID
//   if (req.method === 'GET' && req.url.startsWith('/students/')) {
//     const id = Number(req.url.split('/')[2]);
//     const student = students.find(s => s.id === id);

//     if (student) {
//       res.end(JSON.stringify(student));
//     } else {
//       res.statusCode = 404;
//       res.end(JSON.stringify({ msg: 'Student not found' }));
//     }
//     return;
//   }

//   // ✅ POST
//   if (req.method === 'POST' && req.url === '/students') {
//     let body = '';

//     req.on('data', chunk => body += chunk);

//     req.on('end', () => {
//       const newStudent = JSON.parse(body);
//       newStudent.id = students.length + 1;
//       students.push(newStudent);

//       res.statusCode = 201;
//       res.end(JSON.stringify(newStudent));
//     });
//     return;
//   }

//   // ✅ DELETE
//   if (req.method === 'DELETE' && req.url.startsWith('/students/')) {
//     const id = Number(req.url.split('/')[2]);
//     students = students.filter(s => s.id !== id);

//     res.end(JSON.stringify({ msg: 'Student deleted' }));
//     return;
//   }

//   // ❌ 404
//   res.statusCode = 404;
//   res.end(JSON.stringify({ msg: 'Route not found' }));

// }).listen(4000, () => {
//   console.log('Server running on port 4000');
// });

