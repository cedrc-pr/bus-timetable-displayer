export type RawArrival = {
	aimed_arrival: string;
	destination: string;
	expected_arrival: string | null;
	status: string | null;
	stops_to_destination: number;
};

export type Arrival = {
	id: number;
	aimedArrival: Date;
	destination: string;
	expectedArrival: Date | null;
	status: string | null;
	stopsToDestination: number;
};

export type DisplayInfo = {
	displayTime: string; // maintenant | dans 6 min | à 15:37
	time: {
		mins: number | null; // 6
		time: string | null; // 15:37
	};
	status: string; // à l'heure | en retard de 4 min | en avance de 4 min | horaire théorique
	detailedStatus: {
		message: string; // à l'heure | retard | avance | horaire théorique
		mins: number; // 0         | 4      | 4
	};
	borderColor: string;
	xStops: string;
};
