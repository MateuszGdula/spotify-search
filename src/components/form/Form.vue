<template>

    <form class="form__wrapper" @submit.stop.prevent="sendRequest" ref="form">
        
        <div class="input-group">
            <input type="text" class="form-input" placeholder="Enter album or artist name" required v-model="state.userText">
            <button class="btn btn-primary input-group-btn form__button">
                Search
            </button>
        </div>

        <div class="form-group form__order-by">
            <span>Order by:</span>
            <select class="form-select form__select" v-model="state.order" @change="sortAlbums">
                <option value="bestMatch">best match</option>
                <option value="name">album name</option>
                <option value="date">release date</option>
            </select>
        </div>
    </form>
</template>

<script>
import GlobalStore from '../../GlobalStore'

export default {
    name: "Form",
    data(){
        return {
            state: GlobalStore.state
        }
    },
    computed: {
        requestURL() {
            //build string for axios request based on user input
            return `https://api.spotify.com/v1/search?q=${encodeURIComponent(this.state.userText)}&type=album&limit=50`;
        }
    },
    methods: {
        sendRequest() {
            //get albums from url, and reset GlobalStore state
            GlobalStore.getAlbums(this.requestURL, true);
        },
        sortAlbums() {
            GlobalStore.sortAlbums(this.state.order);
        }
    },
}
</script>

<style lang="scss" scoped>

    .form {
        
        &__wrapper {
            padding: 10px 0;
            border-bottom: 1px solid gray;
        }

        &__button {
            width: 100px;
        }

        &__order-by {
            max-width: 280px;
            margin: 10px 0 0 auto;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span {
                width: 80px;
            }
        }

        &__select {
            max-width: 130px;
        }
    }
</style>