
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('producthunt.com') !== -1) {
    return callback(null, {
      type: 'growth',
      network: 'producthunt'
    });
  } else {
    return callback(null, false);
  }

};