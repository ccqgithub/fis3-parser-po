# fis3-parser-po

> 将po文件转为json，使用[pofile](https://github.com/rubenv/pofile)进行转换

# 使用配置

```javascript
fis.set('project.fileType.text', 'po');

// 处理语言文件*.po
fis.match('src/**.po', {
  rExt: 'json',
  parser: fis.plugin('po', {}, {
    // confs
  })
});

// 默认配置，可以通过配置来调整生成的json的大小和格式
defConf = {
  // 配置po的全局属性
  global: {
    comments: false,
    headers: false
  },
  // 配置item
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
  // 格式
  format: {
    space: '  '
  }
};
```

关于详细的配置属性请参考：[pofile](https://github.com/rubenv/pofile)。
