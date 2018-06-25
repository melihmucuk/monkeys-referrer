
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('youtube.com') !== -1) {
    return callback(null, {
      type: 'social',
      network: 'youtube'
    });
  } else {
    return callback(null, false);
  }

};