<template>
    <div class="timer-container">
        <div class="timer-visualisation">
            <div class="timer-visualisation-inner">

            </div>
        </div>
        <span class="countdown-timer"> 
            <span class="countdown-number"> 
                {{ timer }} 
            </span>
            seconds 
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        timer: {
            type: Number,
            required: true,
        }
    }
})
</script>

<style lang="scss" scoped>

@keyframes widthAnimation {
    from {width: 100%;}
    to {width: 0%;}
}

$google-blue: #4285f4;

.timer-container {
    text-align: center;
    .timer-visualisation {
        background: lightgray;
        border-radius: 3px;
        height: 5px;
        margin: 10px auto 0;
        .timer-visualisation-inner {
            width: 100%;
            background-color: $google-blue;
            height: 100%;
            border-radius: 3px;
            animation-name: widthAnimation;
            animation-timing-function: linear;
            animation-duration: var(--timer-animation-time);
        }
    }
    .countdown-timer {
        font-size: .75rem;
        .countdown-number {
            font-weight: 500;
        }
    }
}
</style>