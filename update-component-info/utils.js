const COS = require('cos-nodejs-sdk-v5');
const util = require('util');
const fs = require('fs');

async function uploadToCos(filePath) {
  try {
    const cos = new COS({
      SecretId: process.env.TENCENT_SECRET_ID,
      SecretKey: process.env.TENCENT_SECRET_KEY,
      UserAgent: 'Node.js',
    });

    const putObject = util.promisify(cos.putObject.bind(cos));
    const res = await putObject({
      Bucket: process.env.BUCKET,
      Region: 'ap-guangzhou',
      Key: 'components-with-stats.json',
      Body: fs.createReadStream(filePath),
      ContentLength: fs.statSync(filePath).size,
    });
    console.log('PutObject Result: ', res);

    return true;
  } catch (e) {
    console.log('Cos Upload Error: ', e);

    return false;
  }
}

module.exports = {
  uploadToCos,
};
