function CaptureClient(options) {
  if (options.debug) {
    this.endpoint = 'https://api-staging.capturoo.com/api/leads'
  } else {
    this.endpoint = options.endpoint || 'https://api.capturoo.com/api/leads';
  }
  this.publicApiKey = options.publicApiKey;

  this.userAgent = window.navigator.userAgent || '';
  this.port = window.location.port;
  this.form = undefined;
  this.button = undefined;
  this.formPending = false;
}

CaptureClient.prototype.setForm = function setForm(formId) {
  var self = this;
  this.form = document.querySelector('#' + formId);

  this.form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (self.formPending) {
      return false;
    }
    self.formPending = true;

    var formData = new FormData(self.form);
    leadData = {};
    formData.forEach(function (value, key) {
      leadData[key] = value;
    });

    self.send({
      utmSource: 'test-source',
      utmMedium: 'test-medium',
      utmTerm: 'test-term',
      utmContent: 'test-content',
      utmCampaign: 'test-campaign'
    }, leadData);

    return false;
  });
};

CaptureClient.prototype.send = function send(trackingData, leadData) {
  var self = this;

  var payload = {};
  Object.assign(payload, {
    systemData: {
      url: window.location.url,
      referrer: document.referrer,
      host: window.location.host,
      protocol: window.location.protocol,
      port: window.location.port,
      userAgent: this.userAgent
    },
    trackingData,
    leadData
  });

  fetch(this.endpoint, {
   body: JSON.stringify(payload),
   cache: 'no-cache',
   credentials: 'same-origin',
   headers: {
     'User-Agent': this.userAgent,
     'Content-Type': 'application/json',
     'X-API-Key': this.publicApiKey
   },
   method: 'POST',
   mode: 'cors'
  })
  .then(function(response) {
    self.formPending = false;
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  })
  .catch(function(err) {
    console.error(err);
  });
};
