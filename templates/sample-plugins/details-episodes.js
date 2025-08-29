/* Sample Details with episodes: info header + episodes list */
(function(){
  const ID = 'sample_details_episodes'

  function Details(){
    const scroll = new Lampa.Scroll({ mask: true, over: true })
    const html = $('<div class="details"><div class="details__info"></div><div class="details__body"></div></div>')
    const info = html.find('.details__info')
    const body = html.find('.details__body')
    let items = []

    this.create = () => {
      const header = $('<div class="details-head">\
        <div class="details-head__title">Demo Show</div>\
        <div class="details-head__meta">2024 • 1 Season • Action</div>\
        <div class="details-head__actions"><div class="selector details-btn">Play S01E01</div></div>\
      </div>')
      header.find('.details-btn').on('hover:enter', ()=> Lampa.Player.play({ title:'S01E01', url:'https://cdn.example/s01e01.m3u8' }))
      info.append(header)

      body.append(scroll.render(true))
      const episodes = Array.from({length: 8}).map((_,i)=> ({
        title: `Episode ${i+1}`, url: `https://cdn.example/s01e${String(i+1).padStart(2,'0')}.m3u8`
      }))
      episodes.forEach(ep => {
        const el = $('<div class="selector episode"></div>').text(ep.title)
        el.on('hover:enter', ()=> Lampa.Player.play({ title: ep.title, url: ep.url }))
        el.on('hover:focus', ()=> scroll.update(el))
        scroll.append(el); items.push(el)
      })

      this.activity.toggle()
      return this.render()
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

  Lampa.Component.add(ID, Details)
  // Optional quick entry in Settings
  Lampa.Settings.add({ title: 'Sample: Details + Episodes', group: 'plugins', onSelect: ()=> Lampa.Activity.push({ title: 'Demo Show', component: ID }) })
})()
