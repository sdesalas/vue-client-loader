window.Vue = window.Vue || {};
window.Vue.Loader = (function() {

	var Loader = {};

	Loader.vues = {};

	Loader.load = function(paths_to_vue, callback) {
        	console.log('Vue.Loader.load()', paths_to_vue);
        	if (typeof paths_to_vue === 'string') {
        		paths_to_vue = [paths_to_vue];
        	}
        	if (paths_to_vue instanceof Array) {
	        	paths_to_vue.forEach(function(path_to_vue) {
		         	Loader.vues[path_to_vue] = { ready : false };
		        	Loader.getVue(path_to_vue, Loader.vueReady.bind(Loader, path_to_vue, callback));
	        	});
	        } else {
	        	throw Error('Vue.Loader.load(). Please pass in a string or an array of strings.');
	        }
	};

	Loader.getVue = function(path_to_vue, callback) { 
        	console.log('Vue.Loader.getVue()', path_to_vue);
		if (path_to_vue) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
			    if (xhr.readyState == XMLHttpRequest.DONE) {
			        var dom = document.createElement('vue');
			        dom.id = path_to_vue.replace(/[^\w]/, '_');
			        dom.innerHTML = xhr.responseText;
			        document.body.append(dom);
			        callback && callback();
			    }
			}
			xhr.open('GET', path_to_vue, true);
			xhr.send(null);
		}
	};

	Loader.vueReady = function(path_to_vue, callback) {
        	console.log('Vue.Loader.vueReady()', path_to_vue);
        	var vue = Loader.vues[path_to_vue],
        	ready = true;
        	if (vue) vue.ready = true;
        	Object.keys(Loader.vues).forEach(function(vue) {
        		if (vue.ready !== true) ready = false;
       		 });
        	if (ready && callback) callback();
	};

	return Loader;

})();
