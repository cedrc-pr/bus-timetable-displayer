export default function toggleDisplayMode() {
	const location = window.location.href;
	if (location.search("/display/") === -1) {
		const splited = location.split("/timetable/");
		if (splited.length !== 2) {
			console.error("error while trying to change the url");
			return;
		}
		window.location.href = splited[0].concat(
			"/timetable/display/".concat(splited[1]),
		);
		return;
	}
	const splited = location.split("display/");
	if (splited.length !== 2) {
		console.error("error while trying to change the url");
		return;
	}
	window.location.href = splited[0].concat(splited[1]);
}
