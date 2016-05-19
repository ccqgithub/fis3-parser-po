'use strict';

var PO = require('pofile');

module.exports = function(content, file, conf) {
  var defConf,
    settings,
    result,
    po;

  po = PO.parse(content);

  // default settings
  defConf = {
    global: {
      comments: false,
      headers: false
    },
    item: {
      comments: true,
      msgid: true,
      msgstr: true,
      msgctxt: true,
      msgid_plural: false,
      references: false,
      comments: false,
      extractedComments: false,
      flags: false
    },
    format: {
      space: '  '
    },
    ext: {
      module: true
    }
  };

  // user settings
  if (typeof conf != 'object')
    conf = {};

  // settings
  settings = Object.assign({}, {
    global: Object.assign({}, defConf.global, conf.global),
    item: Object.assign({}, defConf.item, conf.item),
    format: Object.assign({}, defConf.format, conf.format),
    ext: Object.assign({}, defConf.ext, conf.ext)
  });

  // deal global attr
  ['comments', 'headers', 'extractedComments'].forEach(function(key) {
    if (!settings.global[key]) delete po[key];
  });

  // deal item attr
  po.items = po.items.map(function(item) {
    Object.keys(item).forEach(function(key) {
      if (!settings.item[key]) delete item[key];
    });
    return item;
  });

  // to json
  result = JSON.stringify(po, null, settings.format.space);

  // is module
  if (settings.ext.module) result = 'module.exports = ' + result;

  return result;
};
