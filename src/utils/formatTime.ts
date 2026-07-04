export function formatTime(date: Date): string {
	if (!(date instanceof Date)) throw new Error("Invalid Date");
	const t = date.getTime();
	if (Number.isNaN(t)) throw new Error("Invalid Date");
	const formatter = new Intl.DateTimeFormat("fr", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return formatter.format(date);
}
