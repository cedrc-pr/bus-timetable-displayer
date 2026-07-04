import type { Options } from "nuqs";
import { useEffect } from "react";
import { useArrivals } from "../../../hooks/useArrivals";
import { useServedToday } from "../../../hooks/useServedToday";
import type { Arrival } from "../../../models";
import getDisplayInfo from "../../../utils/getDisplayInfo";
import toggleDisplayMode from "../../../utils/toggleDisplayMode";
import ArrivalsStatus from "../../shared/ArrivalsStatus";

type Props = {
	stop: string;
	setStop: (
		value: string | ((old: string) => string | null) | null,
		options?: Options,
	) => Promise<URLSearchParams>;
};

export default function TimetableDisplay({ stop, setStop }: Props) {
	const { isPending, error, data: arrivals } = useArrivals(stop);
	const { data: stops } = useServedToday();

	const status = ArrivalsStatus({
		stop,
		error: !!error,
		isPending,
		arrivals_length: arrivals ? arrivals.length : 0,
	});

	useEffect(() => {
		if (!stops) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				toggleDisplayMode();
				return;
			}
			const idx = stops.indexOf(stop);
			if (idx === -1) return;
			if (e.key === "ArrowDown" && idx < stops.length - 1) {
				setStop(stops[idx + 1]);
			}
			if (e.key === "ArrowUp" && idx > 0) {
				setStop(stops[idx - 1]);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [stops, stop, setStop]);

	function displayArrivals(arrivals: Arrival[], tinyMode: boolean) {
		return arrivals.map((curr) => {
			const displayInfo = getDisplayInfo(curr);
			const status_mess = displayInfo.detailedStatus.message;

			if (tinyMode) {
				return (
					<div
						key={curr.id}
						className={`border-8 pt-1 pb-4 px-2 flex flex-col rounded ${displayInfo.borderColor}`}
					>
						<h1 className="font-bold text-[3rem]">
							{displayInfo.time.time ?? `${displayInfo.time.mins}'`}
						</h1>
						<h2 className="font-bold text-[1.3rem]">
							{status_mess}{" "}
							{status_mess !== "à l'heure" &&
							status_mess !== "horaire théorique"
								? `${displayInfo.detailedStatus.mins}'`
								: ""}
						</h2>
					</div>
				);
			}

			return (
				<div
					key={curr.id}
					className={`border-8 p-8 flex flex-col justify-between rounded ${displayInfo.borderColor}`}
				>
					<div className="flex justify-between text-[3rem]/10">
						<h1 className="font-bold">
							{displayInfo.time.time ?? `${displayInfo.time.mins}'`}
						</h1>
						<h2 className="font-semibold w-[60%] text-end text-[2.2rem]/10">
							{status_mess}{" "}
							{status_mess !== "à l'heure" &&
							status_mess !== "horaire théorique"
								? `${displayInfo.detailedStatus.mins}'`
								: ""}
						</h2>
					</div>
					<div>
						<p className="text-zinc-700 text-2xl font-semibold mt-3">
							Destination
						</p>
						<h3 className="text-[1.5rem]/6 font-semibold">
							{curr.destination} en{" "}
							<span className="font-bold">{displayInfo.xStops}</span>
						</h3>
					</div>
				</div>
			);
		});
	}

	if (status || !arrivals)
		return (
			<div className="text-[3rem] font-bold text-center h-full flex flex-col justify-center">
				{status}
			</div>
		);

	if (arrivals.length < 6)
		return (
			<section className="grid grid-cols-2 grid-rows-3 gap-8 h-full">
				{displayArrivals(arrivals, false)}
				<div className="text-[2rem]/10 font-bold border-8 border-[#EBD5AB] flex flex-col justify-center text-center">
					<p>fin de service</p>
				</div>
			</section>
		);

	return (
		<section className="grid grid-cols-2 grid-rows-3 gap-8 h-full">
			{displayArrivals(arrivals.slice(0, 5), false)}
			<div className="grid grid-cols-2 grid-rows-2 gap-4">
				{displayArrivals(arrivals.slice(5, 8), true)}
				{arrivals.length > 8 ? (
					<div className="flex justify-center aligns-center">
						<p className="text-[5rem]">···</p>
					</div>
				) : (
					<div className="border-8 border-[#EBD5AB] p-2">
						<p className="text-[2rem]/10 font-bold">fin de service</p>
					</div>
				)}
			</div>
		</section>
	);
}
