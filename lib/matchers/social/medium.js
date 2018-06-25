
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('medium.com') !== -1) {
    return callback(null, {
      type: 'social',
      network: 'medium'
    });
  } else {
    return callback(null, false);
  }
  
};