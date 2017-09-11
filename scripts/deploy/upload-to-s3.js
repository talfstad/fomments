const s3 = require('s3');
const config = require('../config');

const uploadToS3 = env => new Promise((resolve, reject) => {
  const client = s3.createClient({
    s3Options: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
      region: config.aws.region,
    },
  });

  const params = {
    localDir: './dist',
    s3Params: {
      Bucket: config.s3[env].bucket,
      Prefix: config.s3[env].prefix,
      ACL: 'public-read',
    },
  };

  const uploader = client.uploadDir(params);

  uploader.on('error', (err) => {
    reject(err);
  });

  uploader.on('end', () => {
    resolve();
  });
});

module.exports = {
  uploadToS3,
};
