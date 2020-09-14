<template>
<b-navbar id="topnav" toggleable="sm" variant="faded" type="light">
    <b-navbar-brand tag="h1" class="mb-0">
        <span style="color:brown">My</span>Bookstore</b-navbar-brand>
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="'books'">Books</b-nav-item>
        <b-nav-item :to="'authors'">Authors</b-nav-item>
        <b-nav-item :to="'about'">About</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
</b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
#topnav a.nav-link:hover {
  border-bottom: 3px solid red;
  margin-bottom: -3px;
}
#topnav a.nav-link.router-link-active {
  border-bottom: 3px solid grey;
  margin-bottom: -3px;
}
</style>
