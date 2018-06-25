
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('reddit.com') !== -1) {
    return callback(null, {
      type: 'growth',
      network: 'reddit'
    });
  } else {
    return callback(null, false);
  }

};