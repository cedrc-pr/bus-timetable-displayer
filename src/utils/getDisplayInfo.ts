import type { Arrival, DisplayInfo } from "../models";
import { formatTime } from "./formatTime";

export default function getDisplayInfo(arrival: Arrival): DisplayInfo {
	const inXStops = `${arrival.stopsToDestination} arrêt${arrival.stopsToDestination > 1 ? "s" : ""}`;

	if (!arrival.expectedArrival) {
		const formated = formatTime(arrival.aimedArrival);
		const to_return: DisplayInfo = {
			displayTime: `à ${formated}`,
			time: {
				mins: null,
				time: formated,
			},
			status: "horaire théorique",
			detailedStatus: {
				message: "horaire théorique",
				mins: 0,
			},
			borderColor: "border-orange-200",
			xStops: inXStops,
		};
		return to_return;
	}

	const mins_gap = Math.round(
		(arrival.expectedArrival.getTime() - arrival.aimedArrival.getTime()) /
			(1000 * 60),
	);

	// get the right color
	let borderColor = "";
	if (mins_gap === 0) {
		borderColor = "border-[#a7c957]";
	} else if (mins_gap >= -2 && mins_gap <= 2) {
		borderColor = "border-[#c4d19aff]";
	} else if (mins_gap >= -10 && mins_gap <= 10) {
		borderColor = "border-[#e07a5f]";
	} else {
		borderColor = "border-[#ae2012]";
	}

	// find best display time
	const now = new Date();
	const in_n_mins = Math.round(
		(arrival.expectedArrival.getTime() - now.getTime()) / (1000 * 60),
	);
	let displayTime = "";
	if (in_n_mins === 0) {
		displayTime = "maintenant";
	} else if (in_n_mins <= 20) {
		displayTime = `dans ${in_n_mins} min`;
	} else {
		displayTime = `à ${formatTime(arrival.expectedArrival)}`;
	}

	// build the status and detailedStatus.message
	let status = "";
	let message = "";
	if (mins_gap === 0) {
		status = "à l'heure";
		message = "à l'heure";
	} else if (mins_gap > 0) {
		status = `${mins_gap} min de retard`;
		message = "retard";
	} else {
		status = `${-mins_gap} min d'avance`;
		message = "avance";
	}

	const to_return: DisplayInfo = {
		displayTime: displayTime,
		time: {
			time: in_n_mins <= 20 ? null : formatTime(arrival.expectedArrival),
			mins: in_n_mins <= 20 ? in_n_mins : null,
		},
		status,
		detailedStatus: {
			message,
			mins: Math.abs(mins_gap),
		},
		borderColor: borderColor,
		xStops: inXStops,
	};

	return to_return;
}
