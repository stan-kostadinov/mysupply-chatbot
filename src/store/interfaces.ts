export interface chatMessage {
	type?: string;
	from: string;
	message: string;
}

export interface userLimits {
	decisionTimeLimit: number;
	maximumBidAllowed: number;
	retryAmount: number;
}