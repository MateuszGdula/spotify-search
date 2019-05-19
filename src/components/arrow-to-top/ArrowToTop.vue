<template>

    <div v-show="arrowDisplay" 
        class="arrowToTop" 
        tabindex="0" 
        @click="moveToTop" 
        @keyup.enter="$refs.arrow.click()"
        ref="arrow"
    />

</template>

<script>
export default {
    name: "ArrowToTop",
    data(){
        return {
            arrowDisplay: false
        }
    },
    methods: {
        changeArrowDisplay() {
            window.scrollY > 500 ? this.arrowDisplay = true : this.arrowDisplay = false;
        },
        moveToTop() {
            //smooth scrolling to top (most of the browsers still don't support scroll-behavior property)
            let scrollOffset = window.scrollY;
            const scrollSpeed = Math.floor( scrollOffset / 50);

            const interval = setInterval(() => {

                window.scrollBy(0, -scrollSpeed);
                scrollOffset -= scrollSpeed;
                
                scrollOffset <= 0 && clearInterval(interval);

            }, 10);
            
        }
    },
    mounted() {
        window.addEventListener("scroll", this.changeArrowDisplay, false);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.changeArrowDisplay);
    }
}
</script>

<style lang="scss" scoped>

    @keyframes bounce {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(10px);
        }
    }

    .arrowToTop {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        position: fixed;
        z-index: 10;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        background: url("../../assets/fixed-arrow.svg");
        background-repeat: no-repeat;
        background-position: center 10px;
        background-size: contain;

        @media all and (max-width: 768px) {
            bottom: 10px;
            right: 10px;
        }

        @media all and (min-width: 1024px) {
            &:hover {
                animation: bounce 0.5s ease-in infinite alternate;
            }
            &:focus {
                animation: bounce 0.5s ease-in infinite alternate;
            }
        }
    }
</style>