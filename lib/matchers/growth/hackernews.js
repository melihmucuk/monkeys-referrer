
module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('news.ycombinator.com') !== -1) {
    return callback(null, {
      type: 'growth',
      network: 'hackernews'
    });
  } else {
    return callback(null, false);
  }

};