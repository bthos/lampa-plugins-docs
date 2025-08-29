# Full Usage Examples

End-to-end snippets you can paste into a plugin.

## 1) Add settings entry and open a component

```js
Lampa.Settings.add({
  title: 'Example',
  group: 'plugins',
  onSelect: () => Lampa.Activity.push({ title: 'Example', component: 'example' })
})

function Example(){
  const scroll = new Lampa.Scroll({ mask: true, over: true })
  const html = $('<div class="example"><div class="example__body"></div></div>')
  const body = html.find('.example__body')
  let items = []

  this.create = () => {
    body.append(scroll.render(true))
    this.append([
      { title: 'Video 720p', url: 'https://cdn.example/720.m3u8' },
      { title: 'Video 1080p', url: 'https://cdn.example/1080.m3u8' }
    ])
    this.activity.toggle()
    return this.render()
  }

  this.append = (list) => {
    list.forEach((v) => {
      const el = $('<div class="selector example__item"></div>').text(v.title)
      el.on('hover:enter', () => {
        Lampa.Player.play({ title: v.title, url: v.url })
        Lampa.Player.playlist(list.map(x => ({ title: x.title, url: x.url })))
      })
      el.on('hover:focus', () => scroll.update(el))
      scroll.append(el)
      items.push(el)
    })
  }

  this.start = () => {
    Lampa.Controller.add('example', {
      toggle(){ Lampa.Controller.collectionSet(scroll.render()); Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render()) },
      back: this.back,
      up(){ Navigator.move('up') },
      down(){ Navigator.move('down') },
      left(){ if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
      right(){ Navigator.move('right') }
    })
    Lampa.Controller.toggle('example')
  }

  this.back = () => Lampa.Activity.backward()
  this.render = () => html
}

Lampa.Component.add('example', Example)
```

## 2) Network with headers and timeouts

```js
const net = new Lampa.Reguest();
net.timeout(8000)
net.silent('https://api.example.com/items', (json)=>{/* build UI */}, (e)=>{ Lampa.Noty.show('Network error') }, false, {
  headers: { Authorization: 'Bearer ...' }
})
```

## 3) Search hook (filter/augment results)

```js
Lampa.Listener.follow('search', (e) => {
  if (e.query) console.log('Search:', e.query)
})
```
