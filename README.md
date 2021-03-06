# # monkeys-referrer
---------------

monkeys-referrer is a referrer parsing library for node.js / express web apps. This is forked from [inbound](https://github.com/segmentio/inbound) because of lack of maintenance.

## How To Use

### Install
```
npm install monkeys-referrer --save
```

### API
```javascript
var mreferrer = require('monkeys-referrer');
mreferrer.referrer.parse(url, referrer, function (err, description) {
    console.log(description);
});
```

**url** (string) is the page url, equivalent to client-side javascript's ```window.location.href``` or express.js ```req.url```

**referrer** (string) is the referrer, equivalent to client-side javascript's ```document.referrer``` or express.js ```req.header('referrer')```

### Express.js Middleware
```javascript
var mreferrer = require('monkeys-referrer'),
    express = require('express');

var app = express();

app.use(function (req, res, next) {
  var referrer = req.header('referrer');
  var href = req.url;
  mreferrer.referrer.parse(href, referrer, function (err, desc) {
    req.referrer = desc;
    next(err);
  });
});

app.use(app.router);

app.get('/', function (req, res, next) {
  return res.send(req.referrer);
});

var port = 8000;
app.listen(port);
console.log('Server listening on port : ' + port);
```

## Examples

Here is an  example of a visitor clicking a twitter link and ending up at a New Yorker article.

```javascript
var url = "http://www.newyorker.com/online/blogs/johncassidy/2012/08/economy-points-to-dead-heat-in-november.html?
mbid=gnep&google_editors_picks=true";
var referrer = "http://twitter.com/ryah";

mreferrer.referrer.parse(url, referrer, function (err, description) {
    console.log(description);
});
```
```json
{
  "referrer": {
    "type": "social",
    "network": "twitter"
  }
}
```

Here's an example of a visitor clicking a campaign email from gmail, and arriving at a blog:

```javascript
var url = "http://blog.intercom.io/churn-retention-and-reengaging-customers/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+contrast%2Fblog+%28The+Intercom+Blog%29";
var referrer =  "https://mail.google.com/_/mail-static/_/js/main/m_i,t/rt=h/ver=am293eyFlXI.en./sv=1/am=!v8Czf-oeNMn1FOzaNKsLQrJy-oNN3RSSYMAZTBUxCzwgQcXtLnTEHCkGr437GpFE2Dliuw/d=1";

mreferrer.referrer.parse(url, referrer, function (err, description) {
    console.log(description);
});
```
```json
{
  "referrer": {
     "type": "email",
     "client": "gmail",
     "from": "https://mail.google.com/_/mail-static/_/js/main/m_i,t/rt=h/ver=am293eyFlXI.en./sv=1/am=!v8Czf-oeNMn1FOzaNKsLQrJy-oNN3RSSYMAZTBUxCzwgQcXtLnTEHCkGr437GpFE2Dliuw/d=1",
     "link": "http://blog.intercom.io/churn-retention-and-reengaging-customers/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+contrast%2Fblog+%28The+Intercom+Blog%29"
  },
  "campaign": {
    "source": "feedburner",
    "medium": "feed",
    "campaign": "Feed: contrast/blog (The Intercom Blog)"
  }
}
```

## Supported Matchers

### Social
* [Facebook](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/facebook.js)
* [Instagram](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/instagram.js)
* [Twitter](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/twitter.js)
* [Medium](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/medium.js)
* [Youtube](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/youtube.js)
* [Google+](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/googlePlus.js)
* [Pinterest](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/pinterest.js)
* [LinkedIn](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/linkedin.js)
* [Me2day](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/social/me2day.js)

### Growth
* [Reddit](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/growth/reddit.js)
* [HackerNews](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/growth/hackernews.js)
* [ProductHunt](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/growth/producthunt.js)
* [Quora](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/growth/quora.js)
* [IndieHackers](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/growth/indiehackers.js)

### Search
* [Google](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/google.js)
* [Bing](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/bing.js)
* [Yahoo](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/yahoo.js)
* [Baidu](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/baidu.js)
* [Yandex](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/yandex.js)
* [Naver](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/naver.js)
* [Daum](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/daum.js)
* [Nate](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/search/nate.js)

### Email Clients
* [Gmail](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/email/gmail.js)
* [Yahoo](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/email/yahoo.js)
* [Hotmail](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/email/hotmail.js)
* [Naver](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/email/naver.js)
* [Daum](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/email/daum.js)

### Ads
* [Bing](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/ad/bing.js)
* [Google](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/ad/google.js)
* [Yahoo](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/ad/yahoo.js)

### Internal
Internal referrers occur when a visitor navigates between two pages of the same domain. Example: http://site.com => http://site.com/about

* [Internal](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/internal/internal.js)

### Link
If there is a referrer present but it's unrecognized above, we'll just call it a link referrer.

* [Link](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/link/link.js)

### Direct
When a visitor navigates to a site by typing in the url into the address bar, ```document.referrer``` is blank. This is called a direct referral. (There are some [other reasons](#why-is-my-documentreferrer-blank) this can happen as well.)

* [Direct](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/direct/direct.js)

## Utilities

### Shorten API

If you want to count the number of people who came from a specific referrer, you might want to make the following map:

```referrer => { set_of_visitors }```

However, referrers and urls tend to have differences that don't really matter to you, but are slightly different.

Use the `monkeys-referrer.shorten` API to make the referrers and domains unique.

```javascript
mreferrer shorten.url('https://segment.io/?imm_mid=094f89&cmp=em-npa-ug-nl-sep15-html')
// "segment.io"

mreferrer.shorten.url('http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/?utm_source=hackernewsletter&utm_medium=email')
// "ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css
```

## Contribute

### Matchers
Matchers help identify and attach more semantic information to referral sources. We'd your help on adding the hundreds of social, search, ad, and other referral sources not matched yet by monkeys-referrer.

To add matchers:

1. Using existing matchers as an example, create your matcher at [/lib/matchers/](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/).
1. Add your matcher to the priority list of matchers in [index.js](https://github.com/melihmucuk/monkeys-referrer/tree/master/lib/matchers/index.js).
1. Add your test cases to [the test cases file](https://github.com/melihmucuk/monkeys-referrer/tree/master/test/cases/referrers.json).
1. Run and confirm that your test cases pass: ```npm test```
1. Add your matcher to the [readme](https://github.com/melihmucuk/monkeys-referrer/tree/master/README.md).
1. Submit your pull request!

## Advanced

### Why is my document.referrer blank?
1. The visitor came directly to your site by typing the link into the browser's bar.
2. The visitor clicked a link on an https:// page and arrived at a http:// page, such as clicking a link to http://hypem.com on a https://gmail.com email. (Chrome will strip the referrer since you're downgrading security).
3. You were 301 redirected via a proxy that didn't maintain the referrer header.

### Why is the matchers API asynchronous?

Even though most matchers do synchronous string matching, leaving the API asynchronous allows matchers that fill in more semantic information about the referrer by hitting some sort of API.

## License


```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
