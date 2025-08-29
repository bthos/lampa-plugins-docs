# UI Integration

This guide shows how to build screens that feel native in Lampa: adding menu entries, rendering lists/cards, handling focus, and integrating the player.

## Add a menu entry

Add a Settings button or a sidebar item that opens your component.

```js
// Settings entry
Lampa.Settings.add({
  title: 'My Plugin',
  group: 'plugins',
  onSelect: () => Lampa.Activity.push({ title: 'My Plugin', component: 'myplugin' })
})

// Sidebar button (append to first menu list)
function addSidebar(){
  const button = $('<li class="menu__item selector"><div class="menu__ico">📦</div><div class="menu__text">My Plugin</div></li>')
  button.on('hover:enter', () => Lampa.Activity.push({ title: 'My Plugin', component: 'myplugin' }))
  $('.menu .menu__list').eq(0).append(button)
}
if (window.appready) addSidebar(); else Lampa.Listener.follow('app', e => { if (e.type === 'ready') addSidebar() })
```

## Create a scrollable list/grid

Use `Scroll` and focusable `.selector` elements. Update the scroll on `hover:focus`.

```js
function ListComponent(){
  const scroll = new Lampa.Scroll({ mask: true, over: true })
  const html = $('<div class="myplugin"><div class="myplugin__body"></div></div>')
  const body = html.find('.myplugin__body')
  let items = []

  this.create = () => {
    body.append(scroll.render(true))
    ;['One','Two','Three'].forEach((title) => {
      const el = $('<div class="selector myplugin__item"></div>').text(title)
      el.on('hover:enter', () => Lampa.Noty.show('Selected '+title))
      el.on('hover:focus', () => scroll.update(el))
      scroll.append(el)
      items.push(el)
    })
    this.activity.toggle()
    return this.render()
  }

  this.start = () => {
    Lampa.Controller.add('myplugin', {
      toggle(){ Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render()) },
      back: this.back,
      up(){ Navigator.move('up') },
      down(){ Navigator.move('down') },
      left(){ if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
      right(){ Navigator.move('right') }
    })
    Lampa.Controller.toggle('myplugin')
  }

  this.back = () => Lampa.Activity.backward()
  this.render = () => html
}
```

## Cards & grids best practices

- Use existing card templates for a consistent look.
- Ensure elements have the `.selector` class to be focusable.
- Keep 10–15 items per “row” for performance; paginate if needed.

## Details/info screen patterns

Show backdrop, title, meta, and actions. Consider an info header block and a list of episodes/links below.

```js
const info = $('<div class="myplugin-info">\
  <div class="myplugin-info__title">Title</div>\
  <div class="myplugin-info__meta">2024 • Action</div>\
  <div class="myplugin-info__actions">\
    <div class="selector myplugin-btn">Play</div>\
  </div>\
</div>')
```

## Backgrounds

Switch backgrounds for immersive feel.

```js
Lampa.Background.change('https://image.tmdb.org/t/p/w1280/abc.jpg')
```

## Player integration

Offer quality choices and captions if available. Respect remote keys and back behavior.

```js
const sources = [
  { quality: '720p', url: 'https://cdn.example/s720.m3u8' },
  { quality: '1080p', url: 'https://cdn.example/s1080.m3u8' }
]
const chosen = sources[1]
Lampa.Player.play({ title: 'Demo', url: chosen.url })
Lampa.Player.playlist(sources.map(s => ({ title: `Demo ${s.quality}`, url: s.url })))
```
