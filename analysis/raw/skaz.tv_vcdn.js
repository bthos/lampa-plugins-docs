(function() {

  var updateplugins = false;
  var plugins = Lampa.Storage.get('plugins', '[]')

  plugins.forEach(function(plug) {
    if (plug.url.indexOf('skaztv.online') >= 0) {
      updateplugins = true;
	  plug.url = (plug.url + '').replace('http://skaztv.online/vcdn.js', 'https://lampaplugins.github.io/store/vcdn.js');
      plug.url = (plug.url + '').replace('https://skaztv.online/vcdn.js', 'https://lampaplugins.github.io/store/vcdn.js');
    }
	if (plug.url.indexOf('skaz.tv') >= 0) {
      updateplugins = true;
      plug.url = (plug.url + '').replace('http://skaz.tv/vcdn.js', 'https://lampaplugins.github.io/store/vcdn.js');
	  plug.url = (plug.url + '').replace('https://skaz.tv/vcdn.js', 'https://lampaplugins.github.io/store/vcdn.js');
    }
  })

  if (updateplugins)
    Lampa.Storage.set('plugins', plugins);
  $.getScript('https://lampaplugins.github.io/store/vcdn.js');
})();