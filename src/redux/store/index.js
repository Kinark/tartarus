if (process.env.NODE_ENV === 'production') {
   module.exports = require('./store'); // eslint-disable-line global-require
} else {
   module.exports = require('./store.dev'); // eslint-disable-line global-require
}
