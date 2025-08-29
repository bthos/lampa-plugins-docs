(function(){
  const ID = 'myplugin'
  const TITLE = 'My Lampa Plugin'

  // Register a component
  function Screen(){
    const network = new Lampa.Reguest()
    const scroll = new Lampa.Scroll({ mask: true, over: true })
    const html = $('<div class="myplugin-screen"><div class="myplugin-screen__body"></div></div>')
    const body = html.find('.myplugin-screen__body')
    let items = []

    this.create = () => {
      this.activity.loader(true)
      body.append(scroll.render(true))
      // Example data load (replace with your API)
      network.timeout(8000)
      network.silent('https://httpbin.org/json', (json) => {
        this.append([{ title: TITLE }, { title: 'Item from API' }])
        this.activity.loader(false)
        this.activity.toggle()
      }, (e) => {
        const empty = new Lampa.Empty({ descr: 'Failed to load data' })
        html.append(empty.render(true))
        this.start = empty.start
        this.activity.loader(false)
        this.activity.toggle()
      })
      return this.render()
    }

    this.append = (list) => {
      list.forEach((it) => {
        const el = $('<div class="selector myplugin-item"></div>').text(it.title)
        el.on('hover:enter', () => Lampa.Noty.show('Selected: '+it.title))
        el.on('hover:focus', () => scroll.update(el))
        scroll.append(el)
        items.push(el)
      })
    }

    this.start = () => {
      Lampa.Controller.add(ID, {
        toggle(){ Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render()) },
        back: this.back,
        up(){ Navigator.move('up') },
        down(){ Navigator.move('down') },
        left(){ if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
        right(){ Navigator.move('right') }
      })
      Lampa.Controller.toggle(ID)
    }

    this.back = () => Lampa.Activity.backward()
    this.render = () => html
    this.destroy = () => { network.clear(); Lampa.Arrays.destroy(items); scroll.destroy(); html.remove() }
  }

  // Add settings entry
  function addSettings(){
    Lampa.Settings.add({
      title: TITLE,
      group: 'plugins',
      subtitle: 'Enable or configure features',
      onSelect: () => Lampa.Activity.push({ title: TITLE, component: ID })
    })
  }

  function init(){
    if (!window.Lampa){
      return console.log('[myplugin] Lampa not ready')
    }
    Lampa.Component.add(ID, Screen)
    addSettings()
  }

  if (window.appready) init();
  else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
