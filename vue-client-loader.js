window.Vue = window.Vue || {};
window.Vue.ClientLoader = (function() {

  var ClientLoader = {};

  ClientLoader.vues = {};

  ClientLoader.load = function(paths_to_vue, callback) {
    console.log('Vue.ClientLoader.load()', paths_to_vue, callback);
    if (typeof paths_to_vue === 'string') {
      paths_to_vue = [paths_to_vue];
    }
    if (paths_to_vue instanceof Array) {
      paths_to_vue.forEach(function(path_to_vue) {
        ClientLoader.vues[path_to_vue] = {
          ready: false
        };
        ClientLoader.getVue(path_to_vue, ClientLoader.vueReady.bind(ClientLoader, path_to_vue, callback));
      });
    } else {
      throw Error('Vue.ClientLoader.load(). Please pass in a string or an array of strings.');
    }
  };

  ClientLoader.getVue = function(path_to_vue, callback) {
    console.log('Vue.ClientLoader.getVue()', path_to_vue, callback);
    if (path_to_vue) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var dom = document.createElement('vue');
          dom.id = path_to_vue.replace(/[^\w]/, '_');
          dom.innerHTML = xhr.responseText;
          document.body.append(dom);
          ClientLoader.executeVue(dom);
          return callback && callback();
        }
      }
      xhr.open('GET', path_to_vue, true);
      xhr.send(null);
    }
  };

  ClientLoader.executeVue = function(dom) {
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

  ClientLoader.vueReady = function(path_to_vue, callback) {
    console.log('Vue.ClientLoader.vueReady()', path_to_vue, callback);
    var vue = ClientLoader.vues[path_to_vue],
      ready = true;
    if (vue) vue.ready = true;
    Object.keys(ClientLoader.vues).forEach(function(path) {
      var vue = ClientLoader.vues[path];
      if (vue && vue.ready !== true) ready = false;
    });
    return ready && callback && setTimeout(callback,1);
  }

  return ClientLoader;

})();
