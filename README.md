# Capturoo JavaScript Client SDK

## Usage

Be sure to include the Capturoo JavaScript Client SDK in your HTML. We recommend you use the CDN hosted version unless you require the latest development version, or wish to host the SDK on your own server.

```javascript
<script src="https://code.capturoo.com/capturoo-sdk-0.5.1.js"></script>
```

At the bottom of your HTML file use the following snippet of code to link the form
to your Capturoo project.

```javascript
<script>
  var client = new CapturooClient({
    publicApiKey: '<project-public-key>'
  });

  client.setForm('my-form');
</script>
```

`client.setForm('my-form')` corresponds to the HTML id attibute of your form. e.g. `<form id="my-form">`.

Note, you need to replace `<project-public-key>` with your real project public key. See the Project Public Keys section below.

To determine which version your are running at runtime, you can inspect the `client.version` string.

## Project Public Keys
Each Capturoo project has its own public key that can be found by accessing the [capturoo dashboard](https://leads-dashboard.capturoo.com) in the settings section.

## Respository

```sh
git clone https://github.com/capturoo/capturoo-js-client-sdk.git
```

## License

MIT
