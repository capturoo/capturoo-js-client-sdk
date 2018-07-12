function CapturooClient(options) {
  if (options.debug) {
    this.endpoint = 'https://api-staging.capturoo.com/leads';
  } else {
    this.endpoint = options.endpoint || 'https://api.capturoo.com/leads';
  }
  this.publicApiKey = options.publicApiKey;

  this.userAgent = window.navigator.userAgent || '';
  this.port = window.location.port;
  this.form = undefined;
  this.button = undefined;
  this.formPending = false;
}

CapturooClient.prototype.version = '0.5.1';

CapturooClient.prototype.setForm = function setForm(formId) {
  var self = this;
  this.form = document.querySelector('#' + formId);

  this.form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (self.formPending) {
      return false;
    }
    self.formPending = true;

    const formCheckboxes = self.form.querySelectorAll('input[type=checkbox]');
    var lead = {};
    console.log(lead);
    formCheckboxes.forEach(function(v) {
      if (!lead[v.name]) {
        lead[v.name] = [];
      }
    });

    console.log(lead);

    var formData = new FormData(self.form);
    formData.forEach(function (value, key) {
      if (!lead[key]) {
        lead[key] = value;
      } else {
        if (lead[key].constructor === Array) {
          lead[key].push(value);
        }
      }
    });

    self.send({
      utmSource: 'test-source',
      utmMedium: 'test-medium',
      utmTerm: 'test-term',
      utmContent: 'test-content',
      utmCampaign: 'test-campaign'
    }, lead);

    return false;
  });
};

CapturooClient.prototype.send = function send(tracking, lead) {
  var self = this;

  var payload = {};
  Object.assign(payload, {
    system: {
      url: window.location.url,
      referrer: document.referrer,
      host: window.location.host,
      protocol: window.location.protocol,
      port: window.location.port,
      userAgent: this.userAgent
    },
    tracking,
    lead
  });

  fetch(this.endpoint, {
   body: JSON.stringify(payload),
   cache: 'no-cache',
   headers: {
     'User-Agent': this.userAgent,
     'Content-Type': 'application/json',
     'X-API-Key': this.publicApiKey,
     'x-capturoo-timing': 'on'
   },
   method: 'POST'
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
