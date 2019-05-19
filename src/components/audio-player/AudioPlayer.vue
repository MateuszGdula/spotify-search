<template>
  <div class="player__wrapper">
    <div
      class="player__btn"
      tabindex="0"
      :class="{
                'play-btn': !isPlayed,
                'pause-btn': isPlayed
            }"
      @click="clickHandler"
      @keyup.enter="$refs.playerBtn.click()"
      ref="playerBtn"
    />

    <audio ref="audio">
      <source :src="src">
    </audio>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPlayed: false
    };
  },
  methods: {
    clickHandler() {
      this.isPlayed ? this.pause() : this.play();
    },
    play() {
      //stop all audios on the page and play clicked one
      document.querySelectorAll("audio").forEach(function(audio) {
        audio.pause();
      });
      this.$refs.audio.play();
      this.isPlayed = true;
    },
    pause() {
      this.$refs.audio.pause();
      this.isPlayed = false;
    }
  },
  mounted() {
    this.$refs.audio.addEventListener("pause", this.pause, false);
  },
  beforeDestroy() {
    this.$refs.audio.removeEventListener("pause", this.pause);
  }
};
</script>

<style lang="scss">
.player {
  &__btn {
    width: 44px;
    height: 44px;
    display: inline-block;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 60%;

    @media all and (min-width: 1024px) {
      &:hover {
        background-color: #3b38d283;
      }
    }

    &:focus {
      background-color: #3b38d283;
    }
  }
}

.play-btn {
  background-image: url("../../assets/play.svg");
}

.pause-btn {
  background-image: url("../../assets/pause.svg");
}
</style>