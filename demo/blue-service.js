'use strict';

const config = require('./properties').value;
const version = require('../package.json').version;
const hydraExpress = require('../index');

config.hydra.serviceName = 'blue-service';

hydraExpress.init(config, version, () => {
  hydraExpress.registerRoutes({
    '/v1/blue': require('./hello-v1-api')
  });
})
  .then((serviceInfo) => {
    let hydra = hydraExpress.getHydra();
    setInterval(() => {
      let message = hydra.createUMFMessage({
        to: 'hydra:test',
        from: 'blue-service:/',
        body: {
          timestamp: parseInt(new Date().getTime() / 1000)
        }
      });
      hydra.sendMessage(message);
    }, 5000);
  })
  .catch((err) => {
    console.log('err', err);
  });
