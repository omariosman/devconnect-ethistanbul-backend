const express = require('express');
const busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
require('dotenv').config();

const PINATA_JWT = process.env.PINATA_JWT;

const app = express();
const port = 3000;

const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT});

const PINATA_GATEWAY = "violet-electric-meadowlark-667.mypinata.cloud/ipfs";

const busboyFileHandler = (req, res, next) => {
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
        // @todo: add retry mechanism
        const result = await pinata.pinFileToIPFS(readableStream, options);
        const imageURL = `${PINATA_GATEWAY}/${result.IpfsHash}`;
        let metadata = {...payload.metadata, image: imageURL};
        const metadataString = JSON.stringify(metadata);
        const metadataReadableStream = Readable.from(metadataString);
        const metadataOptions = {
            pinataMetadata: {
                name: `${fileName}_metadata`,
            },
        };
        let metadataResult = await pinata.pinFileToIPFS(metadataReadableStream, metadataOptions);
        metadataResult.IpfsHash = `${PINATA_GATEWAY}/${metadataResult.IpfsHash}`;
        console.log(JSON.stringify(result));
		res.json(metadataResult);
	});
	req.pipe(bb);
};

app.post('/upload',  async (req, res) => {
    busboyFileHandler(req, res);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

