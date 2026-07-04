import { Spinner } from "./Spinner";

type Props = {
	stop: string;
	error: boolean;
	isPending: boolean;
	arrivals_length: number;
};

export default function ArrivalsStatus({
	stop,
	error,
	isPending,
	arrivals_length,
}: Props) {
	if (stop === "") return <h1>Veuillez sélectionner un arrêt</h1>;

	if (error) return <h1>Oops ! Une erreur est survenue ...</h1>;

	if (isPending)
		return (
			<section className="flex items-center" aria-busy="true">
				<Spinner />
				<h1 className="ml-2">Chargement en cours</h1>
			</section>
		);

	if (arrivals_length === 0)
		return <h1>Aucun arrêt n'est desservi aujourd'hui ...</h1>;

	return null;
}
