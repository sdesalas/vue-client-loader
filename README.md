# vue-client-loader.js

A client-side component loader for the browser. You can use it to turn `*.vue` files into HTML components without a build.

No dependencies or build toolchains required.

### `index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Vue Loader Example</title>
    <script type="text/javascript" src="lib/vue-2.1.3/vue.js"></script>
    <script type="text/javascript" src="lib/vue-client-loader.js"></script>
  </head>
  <body>
  <div id="app">
    <h2>My Posts</h2>
    <div v-model="posts" class="item-group">
      <post v-for="post in posts"></post>
    </div>
  </div>
  </body>
  <script>
    Vue.ClientLoader.load([
      'components/post.vue',
      // other components ..
      ], function() {
        var vm = new Vue({
          el: '#app',
          data: [...]
        });
    });
  </script>
</html>
```

Components get loaded directly at the bottom of the `<body>` tag using an `XMLHttpRequest`.

### `components/post.vue`
```html
<template id="post-template">
    <div class="post-item list-group-item">
        <span class="label label-primary">{{ votes }}</span>
        <a>{{ post.title }}</a>
    </div>
</template>

<style>
.post-item { width: 200px; }
.post-item span.label { font-weight: bold; }
</style>

<script type="text/javascript">
Vue.component('post', {
  template: "#post-template",
  props: ['post']
});
</script>
