import { useQuery } from "@tanstack/react-query";
import z from "zod";
import type { Arrival } from "../models";
import { AppError } from "../utils/AppError";
import { config } from "../utils/config";

export function useArrivals(stop: string) {
	const rawArrivalsSchema = z.array(
		z.object({
			aimed_arrival: z.string().min(1),
			destination: z.string().min(1),
			expected_arrival: z.string().min(1).nullable(),
			status: z.string().min(1).nullable(),
			stops_to_destination: z.coerce.number().int().positive(),
		}),
	);

	return useQuery({
		queryKey: [`stop ${stop}`],
		refetchInterval: 15000,
		queryFn: async () => {
			const res = await fetch(config.api.concat(`/stop/${stop}`));
			const json = await res.json();

			if (res.status !== 200) {
				throw new AppError({
					status: res.status,
					source: "fetch",
					message: "message" in json ? json.message : "an error occuried",
				});
			}

			const parsed = rawArrivalsSchema.parse(json);
			const mapped = parsed.map((raw, idx) => {
				const arrival: Arrival = {
					id: idx + 1,
					aimedArrival: new Date(raw.aimed_arrival),
					expectedArrival: raw.expected_arrival
						? new Date(raw.expected_arrival)
						: null,
					destination: raw.destination,
					status: raw.status,
					stopsToDestination: raw.stops_to_destination,
				};
				return arrival;
			});

			const now = new Date();
			const sorted = mapped.filter(
				(curr) => (curr.expectedArrival ?? curr.aimedArrival) > now,
			);

			return sorted;
		},
	});
}
