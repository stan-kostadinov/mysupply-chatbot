<template>
	<timer-visualisation :timer="timer" />
    <div class="input-container">
		<input
			id="user-amount"
			v-model="userAmount"
			placeholder="&euro;"
			type="number"
		/>
		<button @click="sendNewAmount">SEND</button>
	</div>
</template>

<script lang="ts">
import { chatMessage } from '@/store/interfaces';
import { defineComponent, nextTick, ref, toRaw, watchEffect } from 'vue';
import { useStore } from 'vuex';
import TimerVisualisation from './TimerVisualisation.vue';

export default defineComponent({
	components: { TimerVisualisation },
    setup() {
        const store = useStore();
        const timer = ref(store.state.inputTimer);
		const userLimits = ref(store.state.userLimits);

        const interval = setInterval(() => {
            if (timer.value > 0) {
                timer.value--
                store.dispatch('updateTimer', timer.value)
            } else {
                clearInterval(interval);
            }
        }, 1000);

		const userAmount = ref();

		function sendMessage(message: chatMessage) {
            store.dispatch('addNewMessage', message);
        }

		function sendNewAmount() {
			// Here we can subtitute the currency with an entry from the BE
			store.dispatch('addNewMessage', {
				from: 'client',
				message: `${userAmount.value} €`,
			});
			
			const answers = toRaw(store.state.predefinedAnswers);
			const maxOffer = ref(store.state.maxOffer);

			if (userAmount.value <= maxOffer.value) {
                clearInterval(interval)
				store.commit('stopReminder', true);
				
				const thankYou = answers.filter((answer: { type: string; }) => answer.type === 'goodPrice')[0];
                sendMessage(thankYou);
			} else {
                clearInterval(interval)
				store.commit('stopReminder', true);

				const tooHigh = answers.filter((answer: { type: string; }) => answer.type === 'tooHigh')[0];
                sendMessage(tooHigh);
				
				nextTick(() => {
					store.dispatch('stopReminder', false);
				})
			}
		}
		
        watchEffect(() => {
            const stopIntervals = store.state.intervalIsStopped
            const cancelReminder = store.state.cancelReminder
            if (stopIntervals || cancelReminder) {
                clearInterval(interval)
				store.commit('stopIntervals', false);
                store.dispatch('updateTimer', userLimits.value.decisionTimeLimit)
            }
        })

        return { timer, userAmount, sendNewAmount }
    },
})
</script>

<style lang="scss">
$facebook-blue: #4267b2;
$google-blue: #4285f4;
.input-container {
	border: 1px solid $google-blue;
	border-radius: 5px;
	padding: 25px;
	margin: 10px 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
    flex-wrap: wrap;

	input {
		border: 1px solid rgba(darken($google-blue, 35%), 60%);
		border-radius: 2px;
		padding: 15px;
		font-size: 1.2rem;
		color: $facebook-blue;
		&:active,
		&:hover,
		&:focus,
		&:focus-visible,
		&:focus-within,
		&:focus-visible {
			border: 1px solid rgba(darken($google-blue, 35%), 60%);
			outline: none;
		}
		&::placeholder {
			text-align: right;
			color: $facebook-blue;
		}
	}

	button {
		background: $facebook-blue;
		color: #fff;
		border: none;
		border-radius: 5px;
		padding: 15px;
		font-size: 1.2rem;
		transition: 0.1s ease-in-out;
		&:disabled {
			background: lightgray;
		}
		&:hover {
			background: lighten($facebook-blue, 5%);
			cursor: pointer;
		}
	}
    p {
        flex: 1 1 100%;
        text-align: center;
    }
}
</style>