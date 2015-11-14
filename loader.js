(function (document, onload) {
  var scripts = document.getElementsByTagName('script');
  var el = document.createElement('script');
  var script = scripts[scripts.length - 1];

  el.type = 'text/javascript';
  el.async = true;
  el.src = 'https://rawgit.com/kruppel/rough-draft/master/rough-draft.js';

  script.parentNode.insertBefore(el, script);
}(document));
