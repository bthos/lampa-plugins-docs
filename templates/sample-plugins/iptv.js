/* Sample IPTV plugin: demonstrates channel list and HLS playback */
(function(){
  const ID = 'sample_iptv'
  const CHANNELS = [
    { title: 'Channel 1', url: 'https://example.com/1.m3u8' },
    { title: 'Channel 2', url: 'https://example.com/2.m3u8' }
  ]

  function open(){
    const comp = new IPTV()
    Lampa.Activity.push({ url: ID, title: 'Sample IPTV', component: comp })
  }

  function IPTV(){
    this.create = () => {
      const list = $('<div class="iptv-list"></div>')
      CHANNELS.forEach(ch => {
        const item = $('<div class="selector iptv-item"></div>').text(ch.title)
        item.on('hover:enter', () => Lampa.Player.play({ title: ch.title, url: ch.url }))
        list.append(item)
      })
      this.html = $('<div class="iptv-screen"></div>').append(list)
      this.start()
    }
    this.start = () => {
      Lampa.Controller.add(ID, { back: () => Lampa.Activity.backward(), toggle(){ Lampa.Controller.collectionSet($('.iptv-screen')); Lampa.Controller.collectionFocus($('.iptv-item').get(0), $('.iptv-screen')) } })
      Lampa.Controller.toggle(ID)
    }
    this.destroy = () => {}
  }

  Lampa.Plugin.create(ID, { title: 'Sample IPTV', onStart(){ open() } })
})()
