/* Sample Search Provider: intercept search queries and display custom results */
(function(){
  const ID = 'sample_search_provider'

  function SearchComponent(){
    const scroll = new Lampa.Scroll({ mask: true, over: true })
    const html = $('<div class="search-provider"><div class="search-provider__body"></div></div>')
    const body = html.find('.search-provider__body')
    let items = []

    this.create = () => {
      body.append(scroll.render(true))
      this.activity.toggle()
      return this.render()
    }
    this.showResults = (list) => {
      scroll.clear(); items = []
      list.forEach(v => {
        const el = $('<div class="selector search-item"></div>').text(v.title)
        el.on('hover:enter', ()=> Lampa.Player.play({ title: v.title, url: v.url }))
        el.on('hover:focus', ()=> scroll.update(el))
        scroll.append(el); items.push(el)
      })
    }
    this.start = () => {
      Lampa.Controller.add(ID, {
        toggle(){ Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render()) },
        back: this.back,
        up(){ Navigator.move('up') }, down(){ Navigator.move('down') }, left(){ if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') }, right(){ Navigator.move('right') }
      })
      Lampa.Controller.toggle(ID)
    }
    this.back = () => Lampa.Activity.backward()
    this.render = () => html
  }

  // Register component and hook search
  Lampa.Component.add(ID, SearchComponent)
  Lampa.Listener.follow('search', (e) => {
    if (e && e.query) {
      const comp = new SearchComponent()
      Lampa.Activity.push({ title: 'Search: '+e.query, component: comp })
      const demo = [
        { title: e.query + ' 720p', url: 'https://cdn.example/720.m3u8' },
        { title: e.query + ' 1080p', url: 'https://cdn.example/1080.m3u8' }
      ]
      // Give UI time to mount
      setTimeout(()=> comp.showResults(demo), 50)
    }
  })
})()
