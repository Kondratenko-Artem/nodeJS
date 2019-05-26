let fs = require('fs');
let http = require('http');

let port = 3000;

let urlHome = '/';
let urlAbout = '/about';
let urlContact = '/contact';

let homeContent = 'Hello World!!!';
let contactContent = fs.readFileSync('index.html');

let errorMessage = '404 Not Found.';

let server = http.createServer(function(request, response) {

    switch (request.url) {
        case urlHome:
            pushHome(response);
            break;

        case urlAbout:
            pushAbout(request, response);
            break;

        case urlContact:
            pushContact(response);
            break;

        default:
            pushNotFound(response);
            break;
    }
});

server.listen(port, function(err) {
    if (err) {
        return console.log(err)
    }

    console.log('server is working by http://localhost:3000')
});



function pushHome(response) {
    response.end(homeContent);
}

function pushAbout(request, response) {
    console.log(request);
    response.end();
}

function pushContact(response) {
    response.end(contactContent);
}

function pushNotFound(response) {
    response.end(errorMessage);
}
