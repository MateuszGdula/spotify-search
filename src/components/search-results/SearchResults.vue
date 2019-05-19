<template>

    <div class="searchResults__wrapper">
        
        <p v-show="state.noResults">No results found for: {{state.userText}}</p>
        <p 
            v-show="state.albums.length > 0 &&
            state.renderedAlbums.length > 0"
        >
            {{ state.albums.length }} results found
        </p>

        <ul class="searchResults__list">
            <SearchResultsListItem 
                v-for="album in state.renderedAlbums" 
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

        <div class="loading loading-lg searchResults__loader" v-if="state.isLoading"/>
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

        &__wrapper {
            width: 100%;
        }

        &__list {
            margin: 0;
        }

        &__loader {
            margin: 30px 0 0 0;
        }
    }
</style>