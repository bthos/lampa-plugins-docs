;(function() {
	var ua = navigator.userAgent || '';
	if (/Android\s+[4-6]/i.test(ua) && /Crosswalk/.test(ua)) {
		Lampa.Socket.init = function () {
			console.log('Socket', 'initialization disabled by wsoff.js plugin')
		};
		Lampa.Socket.send = function (method, data) {
			console.log('Socket', 'Method "' + method + '" send disabled by wsoff.js plugin')
		};
	} else {
		console.log('Socket', 'The wsoff.js plugin cannot work on this device because it is designed for older devices with expired root certificates.')
	}
})();