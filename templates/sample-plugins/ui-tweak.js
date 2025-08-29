/* Sample UI tweak: hide/show search button via a settings toggle */
(function(){
  const KEY = 'ui_tweak_hide_search'
  function apply(){
    const hide = Lampa.Storage.get(KEY, false)
    $('.open--search').toggle(!hide)
  }
  Lampa.Settings.add({ title: 'UI: Toggle Search', group: 'plugins', onSelect: ()=>{ Lampa.Storage.set(KEY, !Lampa.Storage.get(KEY,false)); apply() } })
  Lampa.Storage.listener.follow('change', (e)=>{ if (e.name===KEY) apply() })
  if (window.appready) apply(); else Lampa.Listener.follow('app', e=>{ if (e.type==='ready') apply() })
})()
/* Sample UI tweak: demonstrates header filter */
(function(){
  const ID = 'sample_ui_tweak'

  function apply(){
    const css = `.header .ad { display:none !important }`
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  }

  Lampa.Plugin.create(ID, { title:'Sample UI Tweak', onStart(){ apply() } })
})()
