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
  var position;

  body.style.transition = 'transform 250ms ease';

  tray = parser.parseFromString(
    '<div id="prototray"><button class="prototray__toggle">open</button></div>',
    'text/html'
  ).body.firstChild;
  button = tray.querySelector('button');

  function onMouseDown(e) {
    position = { x: e.x, y: e.y };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseout', onMouseOut, false);
    document.addEventListener('mouseup', onMouseUp, false);
  }

  function onMouseMove(e) {
    button.style.top = Math.min(body.clientHeight, e.clientY) + 'px';
    button.style.left = Math.max(e.clientX - body.clientWidth, -100) - 80 + 'px';
    console.log(e.clientX - body.clientWidth);
  }

  function onMouseOut(e) {
    var from = e.relatedTarget || e.toElement;

    if (from && from.nodeName !== 'HTML') { return; }

    position = null;
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseout', onMouseOut, false);
    document.removeEventListener('mouseup', onMouseUp, false);
  }

  function onMouseUp(e) {
    var p = position;

    position = null;
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseout', onMouseOut, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    if (p.x !== e.x || p.y !== e.y) { return; }

    if (tray.classList.contains('tray--open')) {
      tray.classList.remove('tray--open');
      body.style.transform = prevTransform;
    } else {
      prevTransform = body.style.transform;
      tray.classList.add('tray--open');
      body.style.transform = 'translateX(-200px)';
    }
  }

  button.addEventListener('mousedown', onMouseDown, false);
  body.appendChild(tray);
}());
