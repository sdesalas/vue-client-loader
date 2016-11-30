window.Vue = window.Vue || {};
window.Vue.Loader = (function() {

  var Loader = {};

  Loader.vues = {};

  Loader.load = function(paths_to_vue, callback) {
    console.log('Vue.Loader.load()', paths_to_vue, callback);
    if (typeof paths_to_vue === 'string') {
      paths_to_vue = [paths_to_vue];
    }
    if (paths_to_vue instanceof Array) {
      paths_to_vue.forEach(function(path_to_vue) {
        Loader.vues[path_to_vue] = {
          ready: false
        };
        Loader.getVue(path_to_vue, Loader.vueReady.bind(Loader, path_to_vue, callback));
      });
    } else {
      throw Error('Vue.Loader.load(). Please pass in a string or an array of strings.');
    }
  };

  Loader.getVue = function(path_to_vue, callback) {
    console.log('Vue.Loader.getVue()', path_to_vue, callback);
    if (path_to_vue) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var dom = document.createElement('vue');
          dom.id = path_to_vue.replace(/[^\w]/, '_');
          dom.innerHTML = xhr.responseText;
          document.body.append(dom);
          Loader.executeVue(dom);
          return callback && callback();
        }
      }
      xhr.open('GET', path_to_vue, true);
      xhr.send(null);
    }
  };

  Loader.executeVue = function(dom) {
    if (dom && dom.getElementsByTagName) {
      var scripts = Array.prototype.slice.call(dom.getElementsByTagName("script"));
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src != "") {
          var tag = document.createElement("script");
          tag.src = scripts[i].src;
          document.getElementsByTagName("head")[0].appendChild(tag);
        } else {
          eval(scripts[i].innerHTML);
        }
      }
    }
  };

  Loader.vueReady = function(path_to_vue, callback) {
    console.log('Vue.Loader.vueReady()', path_to_vue, callback);
    var vue = Loader.vues[path_to_vue],
      ready = true;
    if (vue) vue.ready = true;
    Object.keys(Loader.vues).forEach(function(path) {
      var vue = Loader.vues[path];
      if (vue && vue.ready !== true) ready = false;
    });
    return ready && callback && setTimeout(callback,1);
  }

  return Loader;

})();
