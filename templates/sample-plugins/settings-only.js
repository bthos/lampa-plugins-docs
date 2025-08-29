/* Sample Settings-only plugin: toggles a preference without a UI screen */
(function(){
  const KEY = 'sample_flag'
  function toggle(){
    const next = !Lampa.Storage.get(KEY, false)
    Lampa.Storage.set(KEY, next)
    Lampa.Noty.show('Sample flag: ' + (next ? 'ON' : 'OFF'))
  }
  Lampa.Settings.add({ title: 'Sample: Toggle Flag', group: 'plugins', subtitle: 'No UI screen', onSelect: toggle })
})()
