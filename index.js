'use strict';

var PO = require('pofile');

module.exports = function(content, file, conf) {
  var defConf,
    settings,
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
    }
  };

  // user settings
  if (typeof conf != 'object')
    conf = {};

  // settings
  settings = Object.assign({
    global: Object.assign({}, defConf.global, conf.global),
    item: Object.assign({}, defConf.item, conf.item),
    format: Object.assign({}, defConf.format, conf.format)
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

  // po2json
  return JSON.stringify(po, null, settings.format.space);
};
