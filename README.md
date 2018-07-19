# Capturoo JavaScript Client SDK

## Simple HTML

Be sure to include the Capturoo JavaScript Client SDK in your HTML. We
recommend you use the CDN hosted version unless you require the latest
development version, or wish to host the SDK on your own server.

```javascript
<script src="https://code.capturoo.com/capturoo-sdk-1.0.0.js"></script>
```

At the bottom of your HTML file use the following snippet of code to link
the form to your Capturoo project.

```javascript
<script>
  var client = new CapturooClient({
    publicApiKey: '<project-public-key>'
  });

  client.captureForm('my-form')
    .then(function(lead) {
      return client.capture(lead, {
        utmSource: 'test'
      });
    })
    .then(function(response) {
      // uncommment if you want to deal with the captured lead
      // var json = response.json();
      // console.log(json);
      client.redirect('success.html');
    })
    .catch(function(err) {
      console.error(err);
    });
  </script>
```

The parameter passed to `client.captureForm('my-form')` corresponds to the
HTML id attibute of your form. e.g. `<form id="my-form">`. This method
returns a Promise that resolves to an object representing the form
contents.

`client.capture(lead, tracking)` takes two parameters. The first is an
object containing property/value pairs representing the lead. The second
parameter is an optional object containing property/value pairs for
tracking data such as Google Analytics utm_source, utm_medium etc. This is
no fixed schema for tracking so it is up to you what you wish to track.

For a working template, check the `public` directory in this repository.

Note, you need to replace `<project-public-key>` with your real project
public key. See the Project Public Keys section below.

To determine which version your are running at runtime, you can inspect the
`client.version` string.

## Project Public Keys
Each Capturoo project has its own public key that can be found by accessing
the [capturoo dashboard](https://dashboard.capturoo.com) in the settings
section.

Alternatively, if you have installed the [Capturoo CLI tool for developers](https://www.npmjs.com/package/@capturoo/capturoo-cli) you can run
`capturoo projects-list` to retrieve public API keys for all your projects.

## Respository

```sh
git clone https://github.com/capturoo/capturoo-js-client-sdk.git
```

## License

MIT
