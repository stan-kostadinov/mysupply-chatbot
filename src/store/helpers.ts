export default {
    predefinedResponses: [
        { type: "intro", from: "bot", message: "Hi there, i am Botty, the chatbot!" },
        { type: "sorry", from: "bot", message: "Unfortunatelly the price of 10000€ you last entered is too high. Could you please provide a lower one ?" },
        { type: "hurry", from: "bot", message: "Please hurry, there is limited time to enter your new offer !" },
        { type: "tooHigh", from: "bot", message: "This price is too much, please provide a lower one!" },
        { type: "goodPrice", from: "bot", message: "Thanks! Your offer has been submited!" },
        { type: "bye", from: "bot", message: "I'm sorry we couldn't reach an agreement! We will still give your offer to the client, but i suppose it will be too high for him." }
    ],
    userLimits: { decisionTimeLimit: 15, maximumBidAllowed: 3000, retryAmount: 5 },
}