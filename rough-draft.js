(function() {
  var style = document.createElement('style');
  var css = '#prototray{background-color:red;height:100%;position:fixed;right:0;top:0;transform:translateX(200px);width:200px;} .prototray__toggle{position:fixed;left:-80px;width:80px;z-index:9999;}';

  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  var parser = new DOMParser();
  var body = document.body;
  var tray;
  var button;
  var prevTransform;

  body.style.transition = 'transform 250ms ease';

  tray = parser.parseFromString(
    '<div id="prototray"><button class="prototray__toggle">open</button></div>',
    'text/html'
  ).body.firstChild;
  button = tray.querySelector('button');

  function toggle() {
    if (tray.classList.contains('tray--open')) {
      tray.classList.remove('tray--open');
      body.style.transform = prevTransform;
    } else {
      prevTransform = body.style.transform;
      tray.classList.add('tray--open');
      body.style.transform = 'translateX(-200px)';
    }
  }

  button.addEventListener('click', toggle, false);
  body.appendChild(tray);
}());
