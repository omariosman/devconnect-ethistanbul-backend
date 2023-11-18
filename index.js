const express = require('express');
const busboy = require('busboy');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { Readable } = require('stream');

const PINATA_JWT = process.env.PINATA_JWT;
const pinataSDK = require('@pinata/sdk');

const app = express();
const port = 3000;

const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT});

const busboyFileHandler = (req, res, next) => {
	const tenant = req.headers;
	const bb = busboy({ headers: req.headers });
	const payload = {};
    let fileName;
	bb.on('field', (fieldname, val) => {
		payload[fieldname] = JSON.parse(val);
	});
	let buffer = Buffer.alloc(0);
	bb.on('file', async (field, file, filename) => {
		file.on('data', data => {
            fileName = filename.filename;
            console.log(`filename: ${fileName}`)

			buffer = Buffer.concat([buffer, data]);
		});
	});
	bb.on('error', err => {
		next(err);
	});
	bb.on('finish', async () => {
        const options = {
            pinataMetadata: {
                name: fileName,
            },
        };
        const readableStream = Readable.from(buffer);
        const result = await pinata.pinFileToIPFS(readableStream, options);
        console.log(JSON.stringify(result));
		res.json(result);
	});
	req.pipe(bb);
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload',  async (req, res) => {
    busboyFileHandler(req, res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

