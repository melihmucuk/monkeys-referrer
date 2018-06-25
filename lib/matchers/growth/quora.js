
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('quora.com') !== -1) {
    return callback(null, {
      type: 'growth',
      network: 'quora'
    });
  } else {
    return callback(null, false);
  }

};