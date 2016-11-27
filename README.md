# vue-loader.js

Vue Loader is a client-side module loader used to turn `.vue` files into client-side components, removing the need for complex toolchains.

### `index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Vue Loader Example</title>
    <script type="text/javascript" src="lib/vue-2.1.3/vue.js"></script>
    <script type="text/javascript" src="lib/vue-loader.js"></script>
  </head>
  <body>
  <h2>My Posts</h2>
  <div v-model="posts" class="item-group">
    <post v-for="post in posts"></post>
  </div>
  </body>
  <script>
    Vue.Loader.load('components/post.vue');
  </script>
</html>
```

Components get loaded directly at the bottom of the `<body>` tag.

### `components/post.vue`
```html
<template id="post-template">
    <div class="post-item list-group-item">
        <i class="glyphicon glyphicon-chevron-up" @click="upvote"></i>
        <span class="label label-primary">{{ votes }}</span>
        <i class="glyphicon glyphicon-chevron-down" @click="downvote"></i>
        <a>{{ post.title }}</a>
    </div>
</template>

<style>
.post-item { width: 200px; }
.post-item span.label { font-weight: bold; }
</style>

<script type="text/javascript">
Vue.component('navbar', {
  template: "#post-template",
  props: ['post'],
  data: function () {
    return {
      upvoted: false
    };
  },
  methods: {
    upvote: function () {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
    }
  }
});
</script>
