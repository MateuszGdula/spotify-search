<template>

    <div class="listItem__wrapper">

        <div class="listItem__image-wrapper">
            <img class="listItem__image" :src="img">
        </div>

        <div class="listItem__info-wrapper">

            <h2 class="listItem__album-name">{{ name }}</h2>

            <ul class="listItem__info">
                <li>Author{{ authors.length > 1 ? "s" : "" }}: {{ fixedAuthors }}</li>
                <li>Release date: {{ date }}</li>
                <li>Total tracks: {{ totalTracks }}</li> 
            </ul>

            <h3 class="listItem__details-header" @click="getAlbumDetails(); showOrHideDetails()">
                {{ displayDetails && albumDetailsLoaded ? "- Less" : "+ More" }} information
            </h3>

            <div v-show="displayDetails && albumDetailsLoaded" class="listItem__details-wrapper">

                <ul class="listItem__details">
                    <li>Popularity: {{ details.popularity }}</li>
                    <li>Total time: {{ msToMinAndSec(albumTotalTime) }}</li>
                </ul>

                <h4 class="listItem__tracks-header">Tracks list:</h4>
                <ul class="listItem__tracks-list">
                    <li v-for="(track, i) in details.tracks" :key="track.uri">
                        {{ i+1 }}. {{ track.name }}<span> {{ msToMinAndSec(track.duration_ms) }}</span>
                    </li>
                </ul>

            </div>
        </div>
    </div>

</template>

<script>
import Axios from 'axios';

//SearchResultsListItem is a private component of the SearchResults and it doesn't make use of GlobalStore;

export default {
    name: "SearchResultsListItem",
    data(){
        return {
            details: {
                pupularity: 0,
                tracks: []
            },
            displayDetails: false,
            albumDetailsLoaded: false
        }
    },
    props: {
        id: {
            type: String
        },
        img: {
            type: String,
            default: "http://photos1.blogger.com/blogger/3775/2528/320/COVER%20NOT%20AVAILABLE.jpg"
        },
        name: {
            type: String,
            default: "Album name is not available"
        },
        authors: {
            type: Array,
            default: [{name: "Artist name is not available"}]
        },
        date: {
            type: String,
            default: "Release date is not available"
        },
        totalTracks: {
            type: String,
            default: "Tracks number is not available"
        },
        token: {
            type: String
        }
    },
    computed: {
        fixedAuthors() {
            //build the string with authors name
            let authors = "";

            this.authors.forEach((author, i) => {
                authors += author.name;
                authors += this.authors[i+1] === undefined ? "" : ", ";
            });

            return authors;
        },
        albumTotalTime() {
            //sum the tracks duration time
            let totalTime = 0;

            this.details.tracks.forEach(function(track){
                totalTime += track.duration_ms;
            });

            return totalTime;
        }
    },
    methods: {
        getAlbumDetails() {
            //get more ifnormations about album from spotify
            if(this.albumDetailsLoaded) return;

            Axios({
                method: 'get',
                url: `https://api.spotify.com/v1/albums/${this.id}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(res => {
                //save album informations to component data, mark album data as loaded

                this.details.popularity = res.data.popularity.toString();
                this.details.tracks = res.data.tracks.items;

                this.albumDetailsLoaded = true;

            })
            .catch( error => {
                // reload page for new authorization
                if(error.response.status === 400 || error.response.status === 401) {
                    location.reload();
                } 
            })

        },
        showOrHideDetails() {
            //show/hide details when More information headed is clicked
            this.displayDetails = !this.displayDetails;
        },
        msToMinAndSec(ms) {
            //change time in millis to minutes:seconds format
            let min = Math.floor(ms / 60000);
            let sec = ((ms % 60000) / 1000).toFixed(0);
            return min + ":" + (sec < 10 ? '0' : '') + sec;
        }
    }
}
</script>


<style lang="scss" scoped>

    .listItem__wrapper {
        width: 100%;
        margin: 20px 0 0 0;
        padding: 0 0 20px 0;
        border-bottom: 1px solid gray;
        display: flex;
        align-content: center;

        @media (max-width: 600px){
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .listItem__image-wrapper {
        max-width: 220px;
        max-height: 220px;
        margin: 0 20px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 600px){
            margin: 0 0 20px 0;
        }
    }

    .listItem__image {
        max-width: 220px;
        max-height: 220px;
    }

    .listItem__album-name {
        @media (max-width: 600px){
            text-align: center;
        }
    }

    .listItem__info {
        list-style: none;
        @media (max-width: 600px){
            text-align: center;
        }
    }

    .listItem__details-header {
        margin: 25px 0 0 0;
        font-size: 18px;
        color: #3a38d2;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }

        @media (max-width: 600px){
            text-align: center;
        }
    }

    .listItem__details {
        list-style: none;
        @media (max-width: 600px){
            text-align: center;
        }
    }

    .listItem__tracks-header {
        font-size: 18px;
        @media (max-width: 600px){
            text-align: center;
        }
    }

    .listItem__tracks-list {
        list-style: none;
        @media (max-width: 600px){
            text-align: center;
        }

        span {
            margin-left: 5px;
            font-size: 13px;
            font-style: italic;
        }
    }

</style>