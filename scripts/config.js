module.exports = {
  cloudfront: {
    prod: {
      distributionId: 'ESXHMGCYV6DAJ',
      invalidationPath: '/*',
      maxRetries: 0,
    },
  },
  s3: {
    prod: {
      bucket: 'fomments',
      prefix: 'prod',
    },
  },
  aws: {
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAJ2D64TULL6VDEI6Q',
      secretAccessKey: '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',
    },
  },
};
