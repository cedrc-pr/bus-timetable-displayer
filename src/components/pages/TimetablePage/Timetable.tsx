import { useArrivals } from "../../../hooks/useArrivals";
import getDisplayInfo from "../../../utils/getDisplayInfo";
import ArrivalsStatus from "../../shared/ArrivalsStatus";

type Props = {
	stop: string;
};

export default function Timetable({ stop }: Props) {
	const { error, isPending, data: arrivals } = useArrivals(stop);

	const status = ArrivalsStatus({
		stop,
		error: !!error,
		isPending,
		arrivals_length: arrivals ? arrivals.length : 0,
	});

	if (status || !arrivals) return status;

	return (
		<>
			{/* mobile format */}
			<section className="block md:hidden space-y-4">
				{arrivals.map((arrival) => {
					const displayInfo = getDisplayInfo(arrival);
					return (
						<div
							key={arrival.id}
							className={`border-3 ${displayInfo.borderColor} rounded-md p-4 space-y-2`}
						>
							<div className="flex">
								<p className="text-zinc-700">Arrivée</p>
								<p className="ml-4">{displayInfo.displayTime}</p>
							</div>
							<div className="flex">
								<p className="text-zinc-700">Status</p>
								<p className="ml-6">{displayInfo.status}</p>
							</div>
							<div>
								<p className="text-zinc-700">Destination</p>
								<p>{arrival.destination} en</p>
								<p>{displayInfo.xStops}</p>
							</div>
						</div>
					);
				})}
			</section>

			{/* desktop format */}
			<table className="hidden md:block">
				<thead className="text-left">
					<tr>
						<th className="min-w-35 pl-5">Arrivées</th>
						<th className="min-w-45">Status</th>
						<th className="min-w-85">Destination</th>
					</tr>
				</thead>
				<tbody>
					{arrivals.map((arrival) => {
						const displayInfo = getDisplayInfo(arrival);
						return (
							<tr
								key={arrival.id}
								className={`border-b-3 h-8 align-bottom ${displayInfo.borderColor}`}
							>
								<td className="pl-5">{displayInfo.displayTime}</td>
								<td>{displayInfo.status}</td>
								<td>
									{arrival.destination} en {displayInfo.xStops}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
