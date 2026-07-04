import type { Options } from "nuqs";
import { useEffect } from "react";
import { useServedToday } from "../../../hooks/useServedToday";
import toggleDisplayMode from "../../../utils/toggleDisplayMode";
import { Spinner } from "../../shared/Spinner";

type Props = {
	stop: string;
	setStop: (
		value: string | ((old: string) => string | null) | null,
		options?: Options,
	) => Promise<URLSearchParams>;
};

export default function StopSelect({ stop, setStop }: Props) {
	const { isPending, error, data: stops } = useServedToday();

	useEffect(() => {
		if (
			stops &&
			stop === "" &&
			stops.find((stop) => stop === "Parc du Bel-Air")
		) {
			setStop("Parc du Bel-Air");
		}
	}, [stops, setStop, stop]);

	if (error) return <h1>Oops ! Une erreur est survenue ...</h1>;

	if (isPending)
		return (
			<section className="flex items-center">
				<Spinner />
				<h1 className="ml-2">Chargement en cours</h1>
			</section>
		);

	if (stops.length === 0)
		return <h1>Aucun arrêt n'est desservi aujourd'hui ...</h1>;

	return (
		<section>
			<label htmlFor="stop">Arrêt :</label>
			<select
				id="stop"
				value={stop}
				onChange={(e) => setStop(e.target.value)}
				className="border-2 rounded py-4 px-1 mt-1 w-full cursor-pointer hover:bg-[#f8e7be] transition-colors"
			>
				<option value="" className="bg-[#faedcd]">
					sélection
				</option>
				{stops.map((stop) => (
					<option key={stop} value={stop} className="bg-[#faedcd]">
						{stop}
					</option>
				))}
			</select>
			<button
				className="border-2 rounded py-4 px-1 w-full mt-4 cursor-pointer hover:bg-[#f8e7be] transition-colors"
				type="button"
				onClick={() => toggleDisplayMode()}
			>
				Mode affichage
			</button>
		</section>
	);
}
