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
  this.lead = undefined;
  this.formPending = false;
}

CapturooClient.prototype.version = CAPTUROO_VERSION;

CapturooClient.prototype.captureForm = function captureForm(formId) {
  var self = this;
  this.form = document.querySelector('#' + formId);

  return new Promise(function(resolve, reject) {
    self.form.addEventListener('submit', function(e) {
      e.preventDefault()
      if (self.formPending) {
        return false;
      }
      self.formPending = true;

      var formCheckboxes = self.form.querySelectorAll('input[type=checkbox]');
      var lead = {};
      formCheckboxes.forEach(function(v) {
        if (!lead[v.name]) {
          lead[v.name] = [];
        }
      });

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

      this.lead = lead;
      resolve(lead);
    });
  });
};

CapturooClient.prototype.capture = function capture(lead, tracking) {
  lead = lead || this.lead;
  tracking = tracking || {};
  var self = this;

  var payload = {};
  Object.assign(payload, {
    system: {
      url: window.location.url,
      referrer: document.referrer,
      host: window.location.host,
      protocol: window.location.protocol,
      port: window.location.port,
      userAgent: this.userAgent,
      clientVersion: CAPTUROO_VERSION
    },
    lead: lead,
    tracking: tracking,
  });

  return fetch(this.endpoint, {
    body: JSON.stringify(payload),
    cache: 'no-cache',
    headers: {
      'User-Agent': this.userAgent,
      'Content-Type': 'application/json',
      'X-API-Key': this.publicApiKey,
      'x-capturoo-timing': 'on'
    },
    method: 'POST'
  });
};

CapturooClient.prototype.redirect = function redirect(url) {
  window.location = url;
};

export default CapturooClient;
