<template>
  <div class="about">
    <h1>404 Page not found.</h1>
    <p>Go <a href="javascript:history.back()">back</a>
        or to <router-link :to="{name: 'Home'}" exact>Home</router-link>.</p>
  </div>
</template>

<script>

export default {
};
</script>
