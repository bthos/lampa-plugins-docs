/* Sample TMDB Proxy plugin: demonstrates search + list */
(function(){
  const ID = 'sample_tmdb_proxy'
  const API = 'https://example-proxy.invalid/tmdb'
  const KEY = 'sample_tmdb_proxy_enabled'

  function open(){
    const comp = new Screen()
    Lampa.Activity.push({ url: ID, title: 'TMDB Proxy Sample', component: comp })
  }

  function Screen(){
    const network = new Lampa.Reguest()
    this.create = () => {
      this.html = $('<div class="tmdb-screen"><div class="results"></div></div>')
      this.box = this.html.find('.results')
      this.search('spider')
      this.start()
    }
    this.search = (q) => {
      if (!Lampa.Storage.get(KEY, false)) return this.box.text('Proxy disabled in settings')
      network.timeout(8000)
      network.silent(API + '/search/movie?query=' + encodeURIComponent(q), (json)=>{
        this.box.empty()
        ;(json.results||[]).slice(0,10).forEach(m => {
          const item = $('<div class="card">'+m.title+'</div>')
          item.on('hover:enter', ()=>{/* open details */})
          this.box.append(item)
        })
      }, (e)=>{
        console.log('[tmdb-sample] error', e)
      })
    }
    this.start = () => { Controller.add(ID,{ back:()=>history.back() }); Controller.toggle(ID) }
    this.destroy = () => {}
  }

  // Simple settings toggle (in a real plugin, rewrite Lampa.TMDB.image/api)
  Lampa.Settings.add({ title: 'Sample TMDB Proxy (enable)', group: 'plugins', onSelect: ()=> Lampa.Storage.set(KEY, !Lampa.Storage.get(KEY,false)) })

  Lampa.Plugin.create(ID, { title: 'Sample TMDB Proxy', onStart(){ open() } })
})()
