# Capturoo JavaScript Client SDK

## Usage

Include the JavaScript SDK in your HTML.

```javascript
<script src="capturoo-sdk.js"></script>
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

## Project Public Keys
Each Capturoo project has its own public key that can be found by accessing the [capturoo dashboard](https://leads-dashboard.capturoo.com) in the settings section.

## Respository

```sh
git clone https://github.com/capturoo/capturoo-js-client-sdk.git
```

## License

MIT
