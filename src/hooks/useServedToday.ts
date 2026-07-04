import { useQuery } from "@tanstack/react-query";
import z from "zod";
import { AppError } from "../utils/AppError";
import { config } from "../utils/config";

export function useServedToday() {
	const servedTodaySchema = z.array(z.string().min(1));

	return useQuery({
		queryKey: ["servedToday"],
		refetchInterval: 60000,
		queryFn: async () => {
			const res = await fetch(config.api.concat("/served_today"));
			const json = await res.json();

			if (res.status !== 200) {
				throw new AppError({
					status: res.status,
					source: "fetch",
					message: "message" in json ? json.message : "an error occuried",
				});
			}

			return servedTodaySchema.parse(json).sort();
		},
	});
}
