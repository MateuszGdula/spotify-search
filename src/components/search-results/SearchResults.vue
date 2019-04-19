<template>

    <div class="searchResults">

        <ul class="searchResults__list">
            <SearchResultsListItem v-for="album in state.renderedAlbums" 
            :key="album.uri" 
            :id="album.id"
            :img="album.images[1].url" 
            :name="album.name" 
            :authors="album.artists" 
            :date="album.release_date" 
            :totalTracks="album.total_tracks.toString()" 
            :token="state.token"
            />
        </ul>

        <div class="loading loading-lg" v-if="state.isLoading"/>

        <div class="noResults" v-if="state.noResults">
            <p>No results found for: {{state.userText}}</p>
        </div>

    </div>
    
</template>

<script>
import GlobalStore from '../../GlobalStore'
import SearchResultsListItem from './SearchResultsListItem'

export default {
    name: "SearchResults",
    components: {
        SearchResultsListItem
    },
    data(){
        return {
            state: GlobalStore.state
        }
    }
}
</script>

<style lang="scss" scoped>

    .searchResults {
        width: 100%;
    }

    .searchResults__list {
        margin: 0;
    }

    .loading {
        margin: 30px 0 0 0;
    }

</style>
