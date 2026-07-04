type AppErrorContent = {
	status: number;
	source: "fetch";
	message: string;
};

export class AppError extends Error {
	public content: AppErrorContent;

	constructor(content: AppErrorContent) {
		super(content.message);
		this.content = content;
	}
}
