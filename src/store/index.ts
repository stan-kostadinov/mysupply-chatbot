import { createStore } from "vuex";
import { chatMessage, userLimits } from "./interfaces";
import helpers from "./helpers";

export default createStore({
	state: {
		chatHistory: <chatMessage[]>[],
		predefinedAnswers: <chatMessage[]>[],
		userLimits: <userLimits>{},
		inputTimer: null as number | null,
		maxOffer: <number>3000,
		cancelReminder: <boolean>false,
	},
	mutations: {
		updateChatHistory: (state, value: chatMessage|chatMessage[]) => {
			if(Array.isArray(value)) {
				state.chatHistory = [...state.chatHistory, ...value]
			} else {
				state.chatHistory.push(value);
			}
		},
		setPredefinedAnswers: (state, value: chatMessage[]) => {
			state.predefinedAnswers = [...state.predefinedAnswers, ...value]
		},
		setTimer: (state, value: number) => {
			state.inputTimer = value
		},
		stopReminder: (state, value: boolean) => {
			state.cancelReminder = value
		},
		setMaxOffer: (state, value: number) => {
			state.maxOffer = value
		},
		setUserLimits: (state, value: userLimits) => {
			state.userLimits = value
		}
	},
	actions: {
		addNewMessage: ({ commit }, payload) => {
			commit("updateChatHistory", payload);
		},
		getPredefinedAnswers: async ({ commit }) => {
			const predefinedAnswers = await fetch("http://localhost:3000/predefinedResponses")
				.then((res) => res.json())
				.then((res) => res)
				.catch(err => helpers.predefinedResponses);
			if (predefinedAnswers) {
				commit('setPredefinedAnswers', predefinedAnswers)
			} else {
				commit('setPredefinedAnswers', helpers.predefinedResponses)
			}
		},
		getPredefinedUserLimits: async ({ commit }) => {
			const userLimits = await fetch("http://localhost:3000/userLimits")
				.then((res) => res.json())
				.then((res) => res)
				.catch(err => helpers.userLimits);
				
			// Set css variable to use in the loading animation
			// That way whatever the time set from BE is the animation will fit without much JS
			const root = document.querySelector(':root') as HTMLElement | null;
			if(root !== null) {
				root.style.setProperty('--timer-animation-time', `${userLimits.decisionTimeLimit}s`);
			}
			
			const timeLimit = Object.keys(userLimits).length && Object.prototype.hasOwnProperty.call(userLimits, 'decisionTimeLimit') ? userLimits.decisionTimeLimit : 15;
			const maxOffer = Object.keys(userLimits).length && Object.prototype.hasOwnProperty.call(userLimits, 'maximumBidAllowed') ? userLimits.maximumBidAllowed : 3000;

			commit('setTimer', timeLimit);
			commit('setMaxOffer', maxOffer);
			commit('setUserLimits', userLimits);
		},
		getChatMessageHistory: async ({ commit }) => {
			const chatHistory = await fetch("http://localhost:3000/chatHistory")
				.then((res) => res.json())
				.then((res) => res);
			if(chatHistory.length) {
				commit('updateChatHistory', chatHistory);
			}
		},
		updateTimer: ({ commit }, payload) => {
			commit('setTimer', payload);
		},
		stopReminder: ({ commit }, payload) => {
			commit('stopReminder', payload);
		},
	},
});
