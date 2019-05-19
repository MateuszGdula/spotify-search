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

            <h3 
                class="listItem__details-header"
                tabindex="0"  
                @click="getAlbumDetails(); displayDetails = !displayDetails"
                @keyup.enter="$refs.detailsHeader.click()"
                ref="detailsHeader"
            >
                {{ displayDetails && albumDetailsLoaded ? "Less" : "More" }} information
                <div 
                    class="listItem__header-arrow" 
                    :class="{'open': displayDetails && albumDetailsLoaded}"
                />
            </h3>
            <ListItemDetails 
                v-if="albumDetailsLoaded"
                :displayDetails="displayDetails" 
                :popularity="popularity"
                :tracks="tracks"
            />
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import ListItemDetails from './ListItemDetails';

//SearchResultsListItem is a private component of the SearchResults and it doesn't make use of GlobalStore;

export default {
    name: "SearchResultsListItem",
    components: {
        ListItemDetails
    },
    data(){
        return {
            displayDetails: false,
            albumDetailsLoaded: false,
            pupularity: "0",
            tracks: []
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
                this.popularity = res.data.popularity.toString();
                this.tracks = res.data.tracks.items;

                this.albumDetailsLoaded = true;

            })
            .catch( error => {
                // reload page for new authorization
                if(error.response.status === 400 || error.response.status === 401) {
                    location.reload();
                } 
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .listItem{

        &__wrapper {
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

        &__image-wrapper {
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

        &__image {
            max-width: 220px;
            max-height: 220px;
        }

        &__album-name {
            @media (max-width: 600px){
                text-align: center;
            }
        }

        &__info {
            list-style: none;
            @media (max-width: 600px){
                text-align: center;
            }
        }

        &__details-header {
            width: 175px;
            margin: 15px 0 0 0;
            padding: 10px 30px 10px 5px; 
            font-size: 18px;
            color: #3a38d2;
            cursor: pointer;
            position: relative;
            z-index: 5;

            @media all and (min-width: 1024px){
                &:hover {
                    text-decoration: underline;
                }
            }
            @media (max-width: 600px){
                text-align: center;
            }
        }

        &__header-arrow {
            width: 12px;
            height: 12px;
            border-bottom: 2px solid #3a38d2;
            border-left: 2px solid #3a38d2;
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-65%) rotate(-45deg);
            transition: transform 0.3s ease-in;
        }
    }

    .open {
        transform: translateY(-40%) rotate(-225deg);
    }
</style>