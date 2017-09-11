  const AWS = require('aws-sdk');
  const config = require('../config');
  const uuid = require('uuid');

  const createInvalidation = (credentials, distributionId, invalidationPath, region, maxRetries) =>
    new Promise((resolve, reject) => {
      AWS.config.update({
        region,
        maxRetries,
      });
      AWS.config.update(credentials);
      const cloudfrontClient = new AWS.CloudFront();

      const callerRef = uuid.v4();

      const params = {
        DistributionId: distributionId,
        InvalidationBatch: {
          CallerReference: callerRef,
          Paths: {
            Quantity: 1,
            Items: [
              invalidationPath,
            ],
          },
        },
      };

      cloudfrontClient.createInvalidation(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

  const invalidate = env => new Promise((resolve, reject) => {
    const cfConfig = config.cloudfront[env];
    const awsConfig = config.aws;

    createInvalidation(
      awsConfig.credentials,
      cfConfig.distributionId,
      cfConfig.invalidationPath,
      awsConfig.region,
      cfConfig.maxRetries)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });


  module.exports = {
    invalidate,
  };
