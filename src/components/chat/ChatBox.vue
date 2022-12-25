<template>
	<div class="container">
		<div class="chat-box">
			<chat-message
				v-for="chatItem in chatHistory"
				:chatItem="chatItem"
				:key="chatItem.message"
			/>
		</div>
		<input-container v-if="!stopReminder && predefinedAnswersDone && timerIsSet" />
        <!-- Loading animation when we are waiting for the API to give a response -->
        <div class="loader" v-if="!timerIsSet">
            <div class="spinner"></div>
        </div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, ref, toRaw, watch } from "vue";
import { useStore } from "vuex";
import { chatMessage } from "@/store/interfaces";
import ChatMessage from "./ChatMessage.vue";
import InputContainer from "./userInput/InputContainer.vue";

export default defineComponent({
	components: { InputContainer, ChatMessage },
	setup() {
        const store = useStore();
		const chatHistory = ref(store.state.chatHistory);
        let stopReminder = ref(false);
        
        const limits = computed(() => {
            return store.state.userLimits
        })

        const predefinedAnswersDone = computed(() => {
            return store.state.predefinedAnswers.length > 0;
        });

        const timerHasExpired = computed(() => {
            return store.state.inputTimer === 0;
        });

        const timerIsSet = computed(() => {
            return store.state.inputTimer !== null;
        });
        
        function sendMessage(message: chatMessage) {
            store.dispatch('addNewMessage', message);
        }

        let answers: any = [];

        // Initial output, when the API call to get the predefined answers is resolved
        watch(predefinedAnswersDone, (newValue) => {
            if(newValue) {
                answers = toRaw(store.state.predefinedAnswers);
                const hi = answers.filter((answer: { type: string; }) => answer.type === 'intro')[0];
                const sorry = answers.filter((answer: { type: string; }) => answer.type === 'sorry')[0];

                sendMessage(hi);
                sendMessage(sorry);
            }
        })
        let messageCounter = ref(0);
        // If no input send a message to the client to try again
        watch(timerHasExpired, (newValue) => {
            if(newValue && chatHistory.value.length > 1 && !stopReminder.value && messageCounter.value < limits.value.retryAmount) {
                const hurryUp = answers.filter((answer: { type: string; }) => answer.type === 'hurry')[0];
                store.commit('stopReminder', true);
                sendMessage(hurryUp);
                
                setTimeout(() => {
                    store.commit('stopReminder', false);
                    stopReminder.value = !stopReminder.value;
                    store.dispatch('updateTimer', limits.value.decisionTimeLimit)
                }, 1100)
                messageCounter.value++
            } else if (newValue && chatHistory.value.length > 1 && !stopReminder.value && messageCounter.value >= limits.value.retryAmount) {
                // If no input by the user and 5 messages to try again the bot will stop
                const bye = answers.filter((answer: { type: string; }) => answer.type === 'bye')[0];
                store.commit('stopReminder', true);
                sendMessage(bye);
            }
        });

        // If the latest entry is too high send a message to the client to try again
        watch(() => store.state.chatHistory, () => {
            const latestHistory = toRaw(store.state.chatHistory);
            const lastEntryWasTooHigh = latestHistory[latestHistory.length - 1].type === 'tooHigh';
            if (lastEntryWasTooHigh) {
                messageCounter.value = 0;
                setTimeout(() => {
                    store.commit('stopReminder', false);
                    stopReminder.value = !stopReminder.value;
                    store.dispatch('updateTimer', limits.value.decisionTimeLimit);
                }, 1100)
            }
            
        }, { deep: true });

        watch(() => store.state.cancelReminder, (val) => {
			if (val) {
                stopReminder.value = !stopReminder.value;
            }
		});
        
        onMounted(() => {
            // Get user data from BE
            store.dispatch('getPredefinedUserLimits');
            store.dispatch('getPredefinedAnswers');
            store.dispatch('getChatMessageHistory');
        });

        onUpdated(() => {
            const chatContainer = document.querySelector('.chat-box');
            if(chatContainer !== null) {
                chatContainer.scrollTop = chatContainer.scrollHeight
            }
            console.log('scrolled');
            
        });

		return { chatHistory, stopReminder, predefinedAnswersDone, timerIsSet };
	},
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
    height: 95vh;
    border: 1px solid lightgray;
    width: 720px;
    margin: 0 auto;
    position: relative;
	.chat-box {
		max-width: 100%;
        display: flex;
        flex-direction: column;
        flex-basis: 70%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 5px;
            background: rgb(151, 150, 150);
        }
        &::-webkit-scrollbar-thumb {
            background: lightgray;
            border-radius: 10px;
        }
	}
    .loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
            position: absolute;
            left: 45%;
            top: 45%;
        }
    }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>