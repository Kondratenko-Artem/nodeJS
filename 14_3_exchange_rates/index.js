const http = require('http');
const https = require('https');

const port = 3000;
const exchangeRateUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR0ANFM-wz2VU8SywLiRAIkrVNAlJqV9IXnPXG6CTSBIUmNOFwDZ73bvXDU';


const server = http.createServer(function(_request, _response) {
    getExchangeRates(function (_data, _error) {
        if (_error) {
            console.log('Error: ' + error.message);
            _response.end('Error: ' + error.message);
            return;
        }

        const content = toHTML(_data);
        _response.end(content);
    });
});

server.listen(port, function(err) {
    if (!err) {
        console.log('server is working by http://localhost:3000');
    } else {
        return console.log(err);
    }
});


function getExchangeRates(callback) {
    https.get(exchangeRateUrl, function(_response) {

        const statusCode = _response.statusCode;
        const contentType = _response.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                'Status Code: ' + statusCode);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                'Expected application/json but received ' + contentType);
        }

        if (error) {
            console.error(error.message);
            _response.resume();
            return callback(null, error);
        }

        _response.setEncoding('utf8');

        let rawData = '';
        _response.on('data', function(_data) {
            rawData += _data;
        });

        _response.on('end', function() {
            try {
                return callback(rawData, null);
            } catch (e) {
                console.error(e.message);
                return callback(rawData, e);
            }
        });
    }).on('error', function(e) {
        console.error('Error: ' + e.message);
        return callback(null, e);
    });
}

function toHTML(_data) {
    let content;

    if (_data) {
        const exchangeRates = JSON.parse(_data);
        content = "<table border='1'>";
        content += "<tr><td>ccy</td><td>base_ccy</td><td>buy</td><td>sale</td></tr>";
        for (index in exchangeRates) {
            content += "<tr>" +
                "<td>" + exchangeRates[index].ccy + "</td>" +
                "<td>" + exchangeRates[index].base_ccy + "</td>" +
                "<td>" + exchangeRates[index].buy + "</td>" +
                "<td>" + exchangeRates[index].sale + "</td>" +
                "</tr>";
        }
        content += "</table>";
    } else {
        content = "No data";
    }

    return content;
}

