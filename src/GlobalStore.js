import Axios from 'axios';
import { getCookie } from './utils/Utils';

const getInitialState = ()  => {
    return {
        isLoading: false,
        noResults: false,
        order: "bestMatch",
        albums: [],
        renderedAlbums: [],
        token: getCookie('accessToken') !== "undefined" ? getCookie('accessToken') : "",
        displayRedirection: false
    }  
}

const GlobalStore = {

    state: getInitialState(),

    getAuthorization() {
        //if token is taken from cookies the code will not run
        if(!this.state.token){
            //get the value of token from hash and save it to a cookie
            this.state.token = window.location.hash
                            .substring(1)
                            .split('&')[0]
                            .split('=')[1];
            
            const cookieExpire = new Date();
            cookieExpire.setTime(cookieExpire.getTime() + (3600*1000));

            document.cookie = `accessToken=${this.state.token}; expires=${cookieExpire.toGMTString()};`;
            
            window.location.hash = '';

            /* If there is no token in the global store (empty string) => display info
            pop-up and redirect user to Spotify authorization */
            if (!this.state.token) {

                const endpoint = 'https://accounts.spotify.com/authorize';
                const clientId = '46b07972174149b99f8e08d3e38d4aad';
                //redirect to vue dev server or to app on firebase
                const redirect = location.host === 'localhost:8080'
                                ? 'http://localhost:8080'
                                : 'https://spotify-albums-search-a69bf.firebaseapp.com';

                this.state.displayRedirection = true;

                setTimeout(() => {
                    window.location = `${endpoint}?client_id=${clientId}&redirect_uri=${redirect}&response_type=token`;
                }, 2000);
            }
        }
    },

    getAlbums(requestURL, resetState) {
        //if resetState is true set initial state (for the new users request)
        if(resetState) Object.assign(this.state, getInitialState());

        this.state.isLoading = true;

        //send request for albums list to spotify API
        Axios({
            method: 'get',
            url: requestURL,
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(res => {
            let albums = res.data.albums.items;

            if(albums.length === 0) this.state.noResults = true;

            //assign search results to global state
            this.state.albums = this.state.albums.concat(albums);

            this.state.isLoading = false;

            if(res.data.albums.next != null && this.state.albums.length < 300){
                //send next request without clearing the GlobalStore but don't load more than 300 albums (I decided to limit results because Spotify can return up to 10k albums)
                this.getAlbums(res.data.albums.next, false)
            } else {
                //save index of the albums array for "best match" sort, and start rendering results

                this.state.albums.forEach(function(album, i){
                    album.spotifyOrderIndex = i;
                });

                this.renderAlbums();
            }
        })
        .catch( error => {

            //on 400 or 401 error clear token and get new authorization from spotify
            if(error.response.status === 400 || error.response.status === 401) {

                this.state.token = "";
                this.getAuthorization();

            } 
        })

    },
    renderAlbums() {
        //copy 10 items from the albums array to the rendered albums array end
        this.state.renderedAlbums = this.state.renderedAlbums
                                    .concat(this.state.albums.slice(this.state.renderedAlbums.length, this.state.renderedAlbums.length +10));
    },

    sortAlbums(order) {
        //clear rendered albums array -> sort source array (best match sort is default spotify albums order) -> start rendering albums from sorted array
        this.state.renderedAlbums = [];

        if(order === "name") {
           
            this.state.albums.sort(function(a, b){

                if(a.name < b.name) {
                    return -1;
                } else if(a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
                
            });

        } else if (order === "date") {

            this.state.albums.sort(function(a, b){
                return Number(a.release_date.slice(0,4)) - Number(b.release_date.slice(0,4))
            });

        } else {

            this.state.albums.sort(function(a, b){
                return a.spotifyOrderIndex - b.spotifyOrderIndex;
            })

        }

        this.renderAlbums();
    }
}

export default GlobalStore;