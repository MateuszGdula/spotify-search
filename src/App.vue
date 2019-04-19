<template>

  <div id="app">

    <h1 class="appHeader">Spotify albums search</h1>
    <Form/>
    <SearchResults/>

  </div>
  
</template>


<script>
import Form from './components/form/Form'
import SearchResults from './components/search-results/SearchResults'
import GlobalStore from './GlobalStore';

export default {
  name: 'App',
  components: {
    Form,
    SearchResults
  },
  data() {
    return {
      state: GlobalStore.state
    }
  },
  methods: {
    renderAlbums() {
      //render next albums when scroll is on the bottom of page
      (Math.floor(window.innerHeight + window.scrollY) + 1) >= document.body.offsetHeight && GlobalStore.renderAlbums();
    }
  },
  mounted () {
    GlobalStore.getAuthorization();
    window.addEventListener("scroll", this.renderAlbums);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.renderAlbums)
  }
}
</script>


<style lang="scss" scoped>

  #app {
    width: 100%;
    max-width: 800px;
    margin: 30px auto;
    padding: 0 30px;

    @media (max-width: 600px){
      padding: 0 10px;
    }
  }

</style>