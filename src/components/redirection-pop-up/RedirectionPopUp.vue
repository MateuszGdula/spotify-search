<template>
    <div class="pop-up">
        <div class="pop-up__wrapper">
            <div class="pop-up__loader-wrapper">
                <div class="pop-up__loader-dot"></div>
                <div class="pop-up__loader-dot"></div>
                <div class="pop-up__loader-dot"></div>
            </div>
            <p class="pop-up__text">{{ info }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "RedirectionPopUp",
    props: {
        info: {
            type: String,
            default: "Redirecting.. please wait"
        }
    }
}
</script>

<style lang="scss" scoped>

    @keyframes loading {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.4);
        }
    }

    .pop-up {
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, .8);
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        
        &__wrapper {
            width: 300px;
            height: 150px;
            padding: 30px 10px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0 10px 15px -3px rgba(#3a38d2, .5);
        }

        &__loader-wrapper {
            width: 75px;
            margin: 0 auto 20px;
            display: flex;
            justify-content: space-around;

            div:nth-of-type(2) {
                animation-delay: 0.2s;
            }
            div:nth-of-type(3) {
                animation-delay: 0.4s;
            }
        }

        &__loader-dot {
            width: 12px;
            height: 12px;
            background:#3b4351;
            border-radius: 50%;
            animation: loading 0.6s infinite alternate;
        }

        &__text {
            width: 100%;
            text-align: center;
        }
    }
</style>