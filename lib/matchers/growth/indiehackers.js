
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('indiehackers.com') !== -1) {
    return callback(null, {
      type: 'growth',
      network: 'indiehackers'
    });
  } else {
    return callback(null, false);
  }

};