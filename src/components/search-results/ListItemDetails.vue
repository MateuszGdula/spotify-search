<template>
    <transition name="fade" appear="">
        <div v-show="displayDetails" class="listItem__details-wrapper">

            <ul class="listItem__details">
                <li>Popularity: {{ popularity }}</li>
                <li>Total time: {{ msToMinAndSec(albumTotalTime) }}</li>
            </ul>

            <h4 class="listItem__tracks-header">Tracks list:</h4>

            <ul class="listItem__tracks-list">

                <li v-for="(track, i) in tracks" :key="track.uri">

                    <div class="listItem__track-name">
                        {{ i+1 }}. {{ track.name }}<span> {{ msToMinAndSec(track.duration_ms) }}</span>
                    </div>
                    <AudioPlayer
                        v-if="track.preview_url"
                        :src="track.preview_url"
                     />
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
import AudioPlayer from '../audio-player/AudioPlayer';

export default {
    name: "ListItemDetails",
    components: {
        AudioPlayer
    },
    props: {
        displayDetails: {
            type: Boolean,
            default: false
        },
        popularity: {
            type: String,
            default: "0"
        },
        tracks: {
            type: Array,
            default: []
        }
    },
    computed: {
        albumTotalTime() {
            //sum the tracks duration time
            let totalTime = 0;

            this.tracks.forEach(function(track){
                totalTime += track.duration_ms;
            });

            return totalTime;
        }
    },
    methods: {
        msToMinAndSec(ms) {
            //change time in millis to minutes:seconds format
            let min = Math.floor(ms / 60000);
            let sec = ((ms % 60000) / 1000).toFixed(0);
            return min + ":" + (sec < 10 ? '0' : '') + sec;
        },
    }
}
</script>

<style lang="scss" scoped>

    .listItem {
        
        &__details {
            list-style: none;
            @media (max-width: 600px){
                text-align: center;
            }
        }

        &__tracks-header {
            font-size: 18px;
            @media (max-width: 600px){
                text-align: center;
            }
        }

        &__tracks-list {
            margin: 0 auto;
            list-style: none;

            @media (max-width: 600px){
                max-width: 300px;
            }

            li {
                margin: 0px;
                display: flex;
                align-items: center;
            }

            span {
                margin:0px 5px 0px;
                font-size: 13px;
                font-style: italic;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease-in;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>