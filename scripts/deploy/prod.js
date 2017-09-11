const log = require('npmlog');
const s3Uploader = require('./upload-to-s3');
const cloudfront = require('./invalidate-cloudfront');

// NOTE: Upload dist/ to s3 for environment
s3Uploader.uploadToS3('prod')
  .then(() => cloudfront.invalidate('prod'))
  .then(() => {
    log.info('finished deployment script successfully');
  });
