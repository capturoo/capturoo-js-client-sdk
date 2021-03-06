# CHANGELOG
## 1.1.1 (Mon, 20 August 2018)
+ Fix README.md to reference correct SDK version

## 1.1.0 (Mon, 20 August 2018)
+ Uses URLSearchParams to extract Google tracking from query string parameters
+ Report 400 Bad Request and 401 Unauthorized POST requests to the console window
+ Uses a Regular Expression to validate public API key format

## 1.0.4 (Thu, 19 July 2018)
+ Fix README to use correct CDN link

## 1.0.3 (Thu, 19 July 2018)
+ Fix compilation error

## 1.0.2 (Thu, 19 July 2018)
+ Fix package.json name to include scope

## 1.0.0 (Thu, 19 July 2018)
+ rollup config for ES6 Modules, CommonJS and UMD formats
+ client.capture Promise-based method to call API
+ client.captureForm Promise-based method to grab form data

## 0.5.1 (Thu, 12 July 2018)
+ Remove same-origin policy

## 0.5.0 (Wed, 11 July 2018)
+ Add support for checkboxes

## 0.4.0 (1 June 2018)
+ Server-side API expects different reqest body { system: {}, tracking: {}, leads: {} }

## 0.3.0 (2 May 2018)
+ CapturooClient publishes the version string

## 0.2.0 (2 May 2018)
+ Rename the JavaScript file to capturoo-sdk
+ Fix broken endpoints
+ Update README

## 0.1.0 (2 May 2018)
+ Prototype of Capturoo JavaScript Client SDK for lead capture with Capturoo projects
