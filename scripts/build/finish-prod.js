const Rsync = require('rsync');
const rimraf = require('rimraf');

// Copy images
const removeOutdatedImages = () =>
  new Promise((resolve, reject) => {
    rimraf('./dist/images', (err) => {
      if (err) reject(err);
      resolve();
    });
  });

const copyNewImages = () =>
  new Promise((resolve, reject) => {
    new Rsync()
    .source('./src/images')
    .destination('./dist')
    .flags('a') // archive mode
    .execute((executeError) => {
      if (executeError) reject(executeError);
      else {
        resolve();
      }
    });
  });

const copyImages = () =>
  removeOutdatedImages()
    .then(() => copyNewImages());

// Copy fomments-18fj8FA8f38j301f8j13f8jdfks.html
const copyHtml = () =>
  new Promise((resolve, reject) => {
    new Rsync()
    .source('./src/fomments-18fj8FA8f38j301f8j13f8jdfks.html')
    .destination('./dist')
    .execute((executeError) => {
      if (executeError) reject(executeError);
      else {
        resolve();
      }
    });
  });

// NOTE: This is ran after webpack build. Copy over extra things necessary
// for deployment and clean up.
copyImages()
  .then(() => copyHtml());
