(function () {
	'use strict';
	//function myErrHandler() {return true;}
	//window.onerror = myErrHandler;
	var starts=0;
	function iptvskaz(object) {
		var network=new Lampa.Reguest(),scroll=new Lampa.Scroll({mask:!0,over:!0,step:250}),items=[],html=$("<div></div>"),body=$('<div class="iptvskaz category-full"></div>');cache=Lampa.Storage.cache("fav_skazchns",5e3,[]),body.append('<div style="display: none;" class="noti"></div>');var info=null,last=null,_this1=this,scdn=Lampa.Storage.cache("skazcdn"),skazico=Lampa.Storage.cache("skazico"),domain='skaz.tv',cache=Array.from(cache),cache_name=object.url,searched=!1,cors="",lastRequestTime=0; var geo = Lampa.Storage.get("skazgeo");
		//if (geo=='LV' || geo=='BY') var api='tr'; else 
		var api='api';
		console.log('Skaz','CDN',scdn);
		console.log('Skaz',domain);
		console.log('Skaz','days:','');
		var catalogs = [{
        title: 'Общие каналы',
        url: 'http://'+domain+'/ch.json?ico='+skazico+'&ua='+Lampa.Storage.cache("skazua")+'&email='
		},
		{
        title: 'Избранное',
        url: 'http://skaz.tv/ch.json?fav=1&cdn='+scdn+'&ua='+Lampa.Storage.cache("skazua")+'&email='
		}, {
			title: 'VIP Федеральные',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Новости',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Фильмы',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%A4%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Кинозалы',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9A%D0%B8%D0%BD%D0%BE%D0%B7%D0%B0%D0%BB%D1%8B&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP UHD',
			url: 'http://skaz.tv/tvpl.json?gr=UHD&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP HDR',
			url: 'http://skaz.tv/tvpl.json?gr=HDR&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Детские',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%94%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B5&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Спорт',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%A1%D0%BF%D0%BE%D1%80%D1%82&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Музыка',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Образование',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9E%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Природа',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Плюсовые',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9F%D0%BB%D1%8E%D1%81%D0%BE%D0%B2%D1%8B%D0%B5&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},{
			title: 'VIP Прочее',
			url: 'http://skaz.tv/tvpl.json?gr=%D0%9F%D1%80%D0%BE%D1%87%D0%B5%D0%B5&rand=8641&cmail=NvpuE6IyE4EZ7odElF4aSA%3D%3D&cdn='+scdn
			},		{
        title: 'Скрытые вами каналы',
      url: 'http://skaz.tv/ch.json?nodisplay=1&email='
		}
		];	
					Lampa.Storage.set('skaz_vip',0);
			catalogs.push({title: 'Ночные', url: 'http://skaz.tv/ch.json?gr=noo'});
	 if (window.location.protocol=='https:' && Lampa.Platform.is('browser')) Lampa.Helper.show('Зайдите в лампу по http://, а не https://');
 else if (window.location.protocol=='https:') Lampa.Helper.show('Отключите безопасное соединение в Настройки - Остальное');
	if(cache_name.includes("gr=noo")) Lampa.Helper.show('Извините, но кажется у вас нет подписки.');
	this.create=function(){	
	var t=this;return this.activity.loader(!0),network.silent(object.url,this.build.bind(this),(function(){var a=new Lampa.Empty;html.append(a.render()),t.start=a.start,t.activity.loader(!1),t.activity.toggle()})),this.render()},this.back=function(){if(searched){var t=Lampa.Arrays.clone(object);delete t.activity,Lampa.Activity.push(t),searched=!1}else Lampa.Activity.backward()};
		this.append = function (data) {
			if(cache_name.includes("fav=1")){var ar=Lampa.Storage.get("fav_skazchns"),fav=[];Object.keys(ar).forEach((function(a){if(Lampa.Arrays.getKeys(cache[a]).length&&"notdispl"!=a){data&&data.forEach((function(t){t.tvtitle==cache[a]&&fav.push(t)}))}}))} else if(cache_name.includes("nodisplay=1")){var notdisplay=[];if(Lampa.Arrays.getKeys(cache).length){var _this3=this;data&&data.forEach((function(a){Lampa.Arrays.getValues(cache).filter((function(t){'not'+a.tvtitle==t&&notdisplay.push(a)}))}))}}else{
				if(Lampa.Arrays.getKeys(cache).length){_this3=this,fav=[];data&&data.forEach((function(a){Lampa.Arrays.getValues(cache).filter((function(t){a.tvtitle==t&&fav.push(a)}))}))}if(Lampa.Arrays.getKeys(cache).length){_this3=this;var notdispl=[];data&&data.forEach((function(a,t,e){Lampa.Arrays.getValues(cache).filter((function(e){'not'+a.tvtitle==e&&delete data[t]}))}))}}cache_name.includes("fav=1")&&fav?data=fav:cache_name.includes("nodisplay=1")&&notdisplay?data=notdisplay:fav&&(data=fav.concat(data),data=data.filter((function(a,t,e){return e.indexOf(a)===t})));
			//Lampa.Storage.listener.follow('fav_skazchns',function (e) {
				//Lampa.Storage.sync('fav_skazchns','array_string');
			//});
			data.forEach(function (element) {
				var offsett = new Date().getTimezoneOffset();var card=Lampa.Template.get("card",{title:element.tvtitle,release_year:""});$(".info").css("height","4em"),card.addClass("card--collection"),element.tvshift||(element.tvshift=0),card.attr("tvid",element.tvid),card.find(".card__img").css({cursor:"pointer","background-color":"#353535a6","-webkit-border-radius":0,"border-radius":0,"-moz-border-radius":0}),card.find(".card__icons").css({"justify-content":"right",top:"0.3em",right:"0.3em"}),card.find(".card__title").css({display:"none"}),card.find(".card__view").css({"margin-bottom":"0em"});var img=card.find(".card__img")[0];img.onload=function(){card.addClass("card--loaded")},img.onerror=function(e){},img.src=element.tvlogo,cache&&cache.indexOf(element.tvtitle)>-1&&!cache_name.includes("fav=1")&&_this1.addicon("book",card);
				var progr=function(){if(cache_name.includes("tvpl.json")||element.tvmedia.includes("mono"))var e=api+'.skaz.tv/6',t=element.tvtitle;else t=element.tvid,e=api+'.skaz.tv/6';
				var now=Date.now(); if (now - lastRequestTime > 1000) {lastRequestTime = now;$.get("http://"+e+".php?ids="+t.replace("+","__")+'&offset='+offsett,(function(e,t){$(".progr-text").html(e)}))}};card.on("hover:focus",(function(){last=card[0],scroll.update(card,!0),info.find(".info__title").text(element.tvtitle),1==Lampa.Storage.get("epg")&&($(".progr").text(element.tvtitle),setTimeout(progr,600));info.find(".info__title-original").text(element.tvgroup),info.find(".info__create").text(card.find('.card__age').html())}));card.on("hover:hover",(function(){last=card[0],info.find(".info__title").text(element.tvtitle),info.find(".info__create").text(card.find('.card__age').html()),1==Lampa.Storage.get("epg")&&($(".progr").text(element.tvtitle),setTimeout(progr,600));info.find(".info__title-original").text(element.tvgroup)}));card.on('hover:long', function () { if (!cache_name.includes('fav=1')) {var enabled=Lampa.Controller.enabled().name,menu=[{title:!cache||cache&&-1==cache.indexOf(element.tvtitle)?"Добавить в избранное":"Удалить из избранного",fav:!0},{title:!cache||cache&&-1==cache.indexOf('not'+element.tvtitle)?"Скрыть этот канал":"Показать канал",notdispl:!0},{title:1==Lampa.Storage.get("epg")?"Выключить EPG":"Включить EPG",epg:!0}];Lampa.Platform.is("webos")&&menu.push({title:Lampa.Lang.translate("player_lauch")+" - Webos",player:"webos"}),Lampa.Platform.is("android")&&menu.push({title:Lampa.Lang.translate("player_lauch")+" - Android",player:"android"});Lampa.Select.show({title:Lampa.Lang.translate("title_action"),items:menu,onBack:function e(){Lampa.Controller.toggle(enabled)},onSelect:function e(t){t.fav&&(_this1.favorite(element,card),Lampa.Controller.toggle(enabled)),t.notdispl&&(_this1.notdispl(element,card),Lampa.Controller.toggle(enabled)),t.player&&(Lampa.Player.runas(t.player),card.trigger("hover:enter"));t.noporn&&(1==Lampa.Storage.get("noporn")?(Lampa.Storage.set("noporn",0),catalogs.push({title: 'Ночные', url: 'http://skaz.tv/ch.json?gr=18'})):(Lampa.Storage.set("noporn",1)));t.epg&&(1==Lampa.Storage.get("epg")?(Lampa.Storage.set("epg",0),html.find(".scroll").css("float","none").css("width","100%"),$("#progr1").remove()):(Lampa.Storage.set("epg",1),html.find(".scroll").css("float","left"),html.find(".scroll").css("width","70%"),html.find(".scroll").parent().append('<div id="progr1" style="float:right;padding: 1.2em 0;width: 30%;"><h2>Программа <span class="progr"></span></h2><span class="progr-text"></span>'))),Lampa.Controller.toggle(enabled);
				}});
				} else {
				var enabled=Lampa.Controller.enabled().name,menu=[];Lampa.Platform.is("webos")&&menu.push({title:Lampa.Lang.translate("player_lauch")+" - Webos",player:"webos"}),Lampa.Platform.is("android")&&menu.push({title:Lampa.Lang.translate("player_lauch")+" - Android",player:"android"});menu.push({title:1==Lampa.Storage.get("epg")?"Выключить EPG":"Включить EPG",epg:!0});menu.push({title:"Удалить всё из избранного",favdel:!0});Lampa.Select.show({title:Lampa.Lang.translate("title_action"),items:menu,onBack:function(){Lampa.Controller.toggle(enabled)},onSelect:function(e){e.favdel&&(Lampa.Storage.set("fav_skazchns",[]),$(".card").remove()),Lampa.Controller.toggle(enabled),e.player&&(Lampa.Player.runas(e.player),card.trigger("hover:enter"));e.epg&&(1==Lampa.Storage.get("epg")?(Lampa.Storage.set("epg",0),html.find(".scroll").css("float","none").css("width","100%"),$("#progr1").remove()):(Lampa.Storage.set("epg",1),html.find(".scroll").css("float","left"),html.find(".scroll").css("width","70%"),html.find(".scroll").parent().append('<div id="progr1" style="float:right;padding: 1.2em 0;width: 30%;"><h2>Программа <span class="progr"></span></h2><span class="progr-text"></span>'))),Lampa.Controller.toggle(enabled);}})
				}});
				card.on('hover:enter', function () {
					var video={title:element.tvtitle,url:element.tvmedia};
					var playlist=[],i=1;data.forEach((function(a){playlist.push({title:a.tvtitle,url:a.tvmedia}),i++})),video['iptv']=true,video['playlist']=playlist;
					//if(element.tvmedia.includes("tv1.skaz")) video['vast_url'] = 'https://skaz.tv/vast.xml';
					Lampa.Player.play(video);$(".noti").html(element.tvid);	console.log('Skaz',' URL: ',video.url);console.log('Skaz',' Method: ',Lampa.Storage.get('player_hls_method'));
					if(cache_name.includes("tvpl.json")||cache_name.includes("fav=1")){
						playlist=[];$.get("http://skaz.tv/archive.json?email=&name="+encodeURI(element.tvtitle.replace("+","__"))+"&cdn="+scdn+"&ur="+encodeURI(element.tvmedia), function(data, status) {if (status === "success") {if(Array.isArray(data)){data.forEach(function(item) {playlist.push({ title: item.tvtitle, url: item.tvmedia });});Lampa.Player.playlist(playlist);}}});
						}else{
						Lampa.Player.playlist(playlist);}	
					Lampa.Player.opened()&&(0===Lampa.Player.render().find("#title_epg").length&&Lampa.Player.render().find(".player-info__name").append('<span id="title_epg"></span>'),"iptvskaz"==Lampa.Activity.active().component&&(Lampa.Keypad.listener.destroy(),Lampa.Keypad.listener.follow("keydown",(function(e){var a=e.code;
				Lampa.Player.opened()&&(428!==a&&34!==a||Lampa.PlayerPlaylist.prev(),427!==a&&33!==a||Lampa.PlayerPlaylist.next())}))));
				});
				body.append(card);
				items.push(card);		
			});
		};
				//console.log(element);
		if (window.location.hostname!='lite.lampa.mx') {
		var skset1 = setInterval(function () {if (Lampa.Player.opened() && Lampa.Activity.active().component=='iptvskaz') {} else {
		parseEpg();
			}}, 180000);		
		}	
		 var parseone = function (str) {
	 // if (cache_name.includes('tvpl.json')) var ur2 = 'http://api.skaz.tv/4.php?url='+cache_name.replace('?','&'); else
	 // ur2 = 'http://skaz.tv/2.php?ids='+str
	 //$.get(ur2,(function(e,t){""!=e&&Lampa.Player.render().find("#title_epg").text(" - Сейчас: "+e)}));
	  }
  
	var parseEpg=function(e){if (Lampa.Storage.get('account_email') || !cache_name.includes("tvpl.json")) {if(!$(".player-info__body")[0]){if(cache_name.includes("fav=1"))var a="&fav=1";else a="";if(cache_name.includes("tvpl.json"))var r="http://"+api+".skaz.tv/4.php?tv="+cache_name.split('&rand')[0].replace('?','&');else {if(cache_name.includes("fav=1")) r="http://"+api+".skaz.tv/4.php?"+a; else r="http://skaz.tv/3.php?"+a};$.get(r,(function(e,a){e=JSON.parse(e);for(var r=0;r<e.length;r++)$(".card[tvid='"+e[r].id+"'] > .card__age").html(e[r].name),$(".card[tvid='"+e[r].id+"'] > .card__age").css({"background-image":"linear-gradient(90deg, rgb(54 54 54 / 50%) "+e[r].time+"%, rgb(0 0 0 / 0%) 0%)",padding:"7px",border:"1px #3e3e3e dotted","margin-top":"3px","border-radius":"7px",overflow:"hidden","max-height":"56px"})}))}}};
this.addicon=function(c,a){a.find(".card__icons-inner").append('<div class="card__icon icon--'+c+'"></div>')},this.favorite=function(c,a){!cache||cache&&-1==cache.indexOf(c.tvtitle)?cache?cache.push(c.tvtitle):cache=[c.tvtitle]:(Lampa.Arrays.remove(cache,c.tvtitle),Lampa.Storage.set("fav_skazchns",cache)),a.find(".card__icons").remove(),cache.indexOf(c.tvtitle)>-1&&this.addicon("book",a),Lampa.Storage.set("fav_skazchns",cache),searched=!0,this.back()},this.notdispl=function(c,a){!cache||cache&&-1==cache.indexOf('not'+c.tvtitle)?cache?cache.push('not'+c.tvtitle):cache=['not'+c.tvtitle]:(Lampa.Arrays.remove(cache,'not'+c.tvtitle),Lampa.Storage.set("fav_skazchns",cache)),Lampa.Storage.set("fav_skazchns",cache),searched=!0,this.back()};
		this.build = function(data) {
			var _this2=this;if(1!=Lampa.Storage.get("epg")||cache_name.includes("nodisplay=1"))ep1="16.6",ep2="24.6";else var ep1="19.6",ep2="32.6";
			Lampa.Template.add('button_category', "<style>@media screen and (max-width: 2560px) {.iptvskaz .card--collection {width: "+ep1+"1%!important;}}@media screen and (max-width: 800px) {.iptvskaz .card--collection {width: "+ep2+"%!important;}}@media screen and (max-width: 500px) {.iptvskaz .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg><span>Разделы</span>\n    </div>");
						Lampa.Template.add('button_category3', "<div style=\"float: left;\" class=\"full-start__button selector select__fav\"><span>Избранное</span>\n    </div>");
			Lampa.Template.add('button_podp', "<style>@media screen and (max-width: 2560px) {.iptvskaz .card--collection {width: "+ep1+"1%!important;}}@media screen and (max-width: 800px) {.iptvskaz .card--collection {width: "+ep2+"%!important;}}@media screen and (max-width: 500px) {.iptvskaz .card--collection {width: 33.3%!important;}}</style><div style=\"float: left;\" class=\"full-start__button selector view--podp\"><svg viewBox=\"0 0 159 152\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M56.6429 44.8644L79.5 7.49816L102.357 44.8644C103.883 47.3582 106.338 49.1423 109.181 49.8224L151.782 60.0141L123.308 93.2993C121.407 95.5208 120.47 98.4074 120.701 101.322L124.173 144.987L83.7176 128.192C81.0176 127.071 77.9824 127.071 75.2824 128.192L34.8273 144.987L38.2988 101.322C38.5305 98.4074 37.5925 95.5208 35.6921 93.2993L7.21802 60.0141L49.8186 49.8224C52.6618 49.1423 55.1174 47.3582 56.6429 44.8644ZM33.3175 145.613C33.318 145.613 33.3185 145.613 33.3191 145.613L33.3175 145.613Z\" stroke=\"currentColor\" fill=\"\" stroke-width=\"11\"></path></svg><span>Подписка</span>\n    </div>");
			$(".background__two.visible").css("opacity","0"),$(".background__one.visible").css("opacity","0");
			Lampa.Template.add('info_radio', '<div class="info layer--width"><div class="info__left"><span style="font-size:2em" class="info__title"></span>  <span style="font-size:0.8em"></span><div class="info__create" style="margin-top: 0.2em"></div></div><div style="margin-top: -15px;display: flex !important;" class="info__right">  <div id="stantion_filtr"></div></div></div>');
			var btn=Lampa.Template.get("button_category"),btn2=Lampa.Template.get("button_category3"),btn3=Lampa.Template.get("button_podp");info=Lampa.Template.get("info_radio"),info.find("#stantion_filtr").append(btn2),info.find("#stantion_filtr").append(btn3),info.find("#stantion_filtr").append(btn),info.find(".view--category").on("hover:enter hover:click",(function(){_this2.selectGroup()})),info.find(".view--podp").on("hover:enter hover:click",(function(){_this2.selectGroup2()})),info.find(".select__fav").on("hover:enter hover:click",(function(){Lampa.Activity.push({url:"http://skaz.tv/ch.json?fav=1&cdn="+scdn+"&ua="+Lampa.Storage.cache('skazua')+"&email=",title:"Избранное",component:"iptvskaz",page:1})}));
			
			info.find(".select__poisk").on("hover:enter hover:click",(function(){
				
				Lampa.Input.edit({
    value: "",
    title: "Введите название канала",
    free: !0,
    nosave: !0
}, function(t) {
		Lampa.Activity.push({
        url: "http://"+domain+"/ch.json?search="+t+"&email=",
        title: "Поиск",
        component: "iptvskaz",
        page: 1
		});
	}
);
				
				}));
			
			scroll.render().addClass("layer--wheight").data("mheight",info),html.append(info.append()),html.append(scroll.render());
			1!=Lampa.Storage.get("epg")||cache_name.includes("nodisplay=1")||(html.find(".scroll").css("float","left"),html.find(".scroll").css("width","70%"),html.find(".scroll").parent().append('<div id="progr1" style="float:right;padding: 1.2em 0;width: 30%;"><h2>Программа <span class="progr"></span></h2><span class="progr-text"></span>'));
			this.append(data),scroll.append(body),this.activity.loader(!1),this.activity.toggle(),parseEpg();
		this.selectGroup=function(){Lampa.Select.show({title:"Плейлист",items:catalogs,onSelect:function(t){Lampa.Activity.push({url:t.url,title:t.tvmedia,component:"iptvskaz",page:1})},onBack:function(){Lampa.Controller.toggle("content"),parseEpg();}})};
		}
		this.selectGroup2 = function () {
					  var modal = '<div><div class="broadcast__text" style="text-align:left">Вы не авторизованы в Лампе.<br/>Для авторизации перейдите с любого устройства на страницу https://cub.rip/add<br/>Введите полученные цифры в Настройки - Синхронизация - Выполнить вход.<br><br/>В подписке более 1700 каналов. Доступен архив на большинство каналов<br/>Стоимость подписки 220р./мес (от 6 мес. акции). Все вопросы в группе телеграм @helpiptv</div></div>';
			Lampa.Template.add('skazspb', modal);
			var temp = Lampa.Template.get('skazspb');
			var enabled=Lampa.Controller.enabled().name;
			var skazback = temp.find('.skazback');
			var skaznext = temp.find('.skaznext');
			skazback.on('hover:enter', function () {
			 $.get( 
                  "http://skaztv.online/oplata.php",
                  { billId: "19e440e3a04607944cf7920241fc4c784",
					comment: "",
					email: "",
					amount: 220,
					ino: 9,
					onlysbp: 1
				  },
                  function(data) {
                    $('.skazsbp2').html(data);
                  }
               );
            });
			skaznext.on('hover:enter', function () {
			window.open('http://skaztv.online/oplata.php?amount=220&lifetime=2025-08-30T2359&billId=19e440e3a04607944cf7920241fc4c784&comment=&email=&ino=4')
			});
		Lampa.Modal.open({title:"",html:temp,onBack: function onBack() {Lampa.Modal.close();Lampa.Controller.toggle(enabled);$(".modal--large").remove();},
		size:"medium",mask: true});
		};
			
		this.start=function(){var o=this;Lampa.Controller.add("content",{toggle:function(){Lampa.Controller.collectionSet(scroll.render()),Lampa.Controller.collectionFocus(last||!1,scroll.render())},left:function(){Navigator.canmove("left")?Navigator.move("left"):Lampa.Controller.toggle("menu")},right:function(){Navigator.canmove("right")?Navigator.move("right"):o.selectGroup()},up:function(){Navigator.canmove("up")?Navigator.move("up"):info.find(".view--category").hasClass("focus")?Lampa.Controller.toggle("head"):info.find(".view--category").hasClass("focus")||(Lampa.Controller.collectionSet(info),Navigator.move("right"))},down:function(){Navigator.canmove("down")?Navigator.move("down"):info.find(".view--category").hasClass("focus")&&Lampa.Controller.toggle("content")},back:function(){Lampa.Activity.backward()}}),Lampa.Controller.toggle("content");
		};
		this.pause = function() {if (Lampa.Activity.active().component=='iptvskaz') {clearInterval(skset1);skset1=null;}};
		this.stop=function(){},this.render=function(){return html},this.destroy=function(){scroll.destroy(),info&&info.remove(),html.remove(),body.remove(),network=null,items=null,html=null,body=null,info=null};
	}
			function add() {
				var icos = '<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" stroke="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>';
				var menu_itemss = $('<li class="menu__item selector focus" data-action="iptvskaz"><div class="menu__ico">' + icos + '</div><div class="menu__text">ТВ by skaz</div></li>');
				menu_itemss.on('hover:enter', function() {
					Lampa.Activity.push({
						url: 'https://skaz.tv/ch.json?ua='+Lampa.Storage.cache("skazua")+'&email=',						title: 'ТВ by skaz',
						component: 'iptvskaz',
						page: 1
					});
				});
				$('.menu .menu__list').eq(0).append(menu_itemss);
				Lampa.SettingsApi.addComponent({
        component: 'iptvskaz',
        icon: "<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n                <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            </svg>",
        name: 'by skaz'
      });
	  
if (starts < 1) {
	  starts = 1;	
	  	  
		  Lampa.SettingsApi.addParam({
				component: 'iptvskaz',
				param: {
					name: 'only_title',
					type: 'title',
					default: true
				},
				field: {
					name: 'ТВ by Skaz'
				}
			});
	  	Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'b_skaz',
          type: 'trigger',
          "default": false,
        },
        field: {
          name: 'Убрать с главной трансляции',
		  description: 'Убирает с главной трансляцию события'
        },
        onChange: function (value) {
			Lampa.Noty.show('Необходимо перезайти в лампу');
		}
	  });
	  
      Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'skazcdn',
          type: 'select',
          values: {
            0: 'VIP',
			12: 'VIP CDN EUROPA 2',
			9: 'VIP CDN RU',
			2: 'VIP RU',
			3: 'VIP PL',
			4: 'VIP FR',
			8: 'VIP FR 2',
			13: 'VIP DE',
			14: 'VIP DE 2',
			16: 'VIP RU 2',
			17: 'VIP RU 3',
			19: 'VIP GB',
			21: 'VIP RU 8',
			22: 'VIP Asia',
			10: 'VIP NL',
			20: 'VIP RU 7',
			24: 'VIP UA',
			25: 'VIP RO'
          },
          "default": 0
        },
        field: {
          name: 'Серверы подписки'
        },
        onChange: function (value) {
			Lampa.Noty.show('Перезайдите в ТВ by Skaz для применения настроек');
		}
	  });
	  
	  Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'skaztest',
          type: 'select',
          values: {
            0: 'Выберите',
			1: 'Перейти в тест',
          },
          "default": 0
        },
        field: {
          name: 'Тест скорости',
		  description: 'Проверьте скорость перед выбором сервера подписки'
        },
        onChange: function (value) {
			Lampa.Storage.set("skaztest",0);
			window.open('http://t.skaz.tv/speed/', '_blank');
		}
	  });
	  	   Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'noskaz2',
          type: 'select',
          values: {
            0: 'Отображать в меню',
			1: 'Скрыть из меню',
          },
          "default": 0
        },
        field: {
          name: 'ТВ by Skaz 2.0',
		  description: 'Расширение с другим интерфейсом'
        },
        onChange: function (value) {
			location.reload()
		}
	  });
	  			Lampa.SettingsApi.addParam({
				component: 'iptvskaz',
				param: {
					name: 'only_title',
					type: 'title',
					default: true
				},
				field: {
					name: 'Онлайн'
				}
			});
		Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'online_skaz',
          type: 'select',
           values: {
                'false': 'Отображать',
                'true': 'Скрыть',
            },
            default: false,
        },
        field: {
          name: 'Отображать Onlyskaz'
        }
	  });
	  Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'online_skaz2',
          type: 'select',
           values: {
                'true': 'Отображать',
                'false': 'Скрыть',
            },
            default: false,
        },
        field: {
          name: 'Отображать Onlyskaz 2.0',
		  description: 'Онлайн с автовыбором источника, управление в плеере'
        }
	  });
	  	  Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'skazonline2_view',
          type: 'trigger',
            default: false,
        },
        field: {
          name: 'Спрятать значок Onlyskaz 2.0',
		  description: 'Позволяет скрыть значок с карточки фильма'
        },
        onChange: function (value) {
			Lampa.Noty.show('Необходимо перезайти в лампу');
		}
	  });
	  
	  
	  	  			Lampa.SettingsApi.addParam({
				component: 'iptvskaz',
				param: {
					name: 'only_title',
					type: 'title',
					default: true
				},
				field: {
					name: '18+'
				}
			});
	  	Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
          name: 'noporn',
          type: 'select',
          values: {
            0: 'Показать',
			1: 'Скрыть',
          },
          "default": 0
        },
        field: {
          name: 'Каналы для взрослых',
		  description: 'Включает раздел Ночные'
        },
        onChange: function (value) {
			Lampa.Noty.show('Необходимо перезайти в плагин из левого меню');
		}
	  });
	  Lampa.SettingsApi.addParam({
        component: 'iptvskaz',
        param: {
            name: 'SISI_fix',
            type: 'select',
            values: {
                1: 'Скрыть из меню',
                2: 'Отображать в меню',
            },
            default: '1',
        },
        field: {
            name: 'Клубничка',
			description: 'Плагин с популярными 18+ источниками'
        },
        onChange: function(value) {
            if (Lampa.Storage.field('SISI_fix') == 2) {
                var pluginsArray = Lampa.Storage.get('plugins');
                pluginsArray.push({
                    "url": "http://skaz.tv/sisi.js",
                    "status": 1
                });
                Lampa.Storage.set('plugins', pluginsArray);
                location.reload()
            }
            if (Lampa.Storage.field('SISI_fix') == 1) {
                var plugSisiArray = Lampa.Storage.get('plugins');
                var delpluginSisi = plugSisiArray.filter(function(obj) {
                    return (obj.url !== 'http://skaz.tv/sisi.js' && obj.url !== 'https://skaz.tv/sisi.js')
                });
                Lampa.Storage.set('plugins', delpluginSisi);
                location.reload()
            }
        }
	  });
}
	window.plugin_iptvskaz_ready = true;   
	}
	function iptv_skaz() {
			Lampa.Storage.set('lastonline_lampacskaz',0);
			Lampa.Component.add('iptvskaz', iptvskaz);
		if (window.appready) {add();} else Lampa.Listener.follow('app', function(r) {add();});
		window.plugin_iptvskaz_ready = true;   
		}
		if (!window.plugin_iptvskaz_ready) iptv_skaz();
		  if (Lampa.Storage.get('online_skaz2')==true && !window.plugin_skazonline2) {
			$.getScript('http://skaz.tv/play.js');
			}
	    if (!window.plugin_iptv_ready2 && Lampa.Storage.get("noskaz2")!='1') $.getScript('http://skaz.tv/tv2.js?email=');
				if (Lampa.Storage.get('b_skaz')!=true) {
	//$.getScript('http://oleg.skaz.tv/b.js');
	}
   })();