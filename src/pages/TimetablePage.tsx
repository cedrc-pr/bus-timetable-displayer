import { useQueryState } from "nuqs";
import StopSelect from "../components/pages/TimetablePage/StopsSelect";
import Timetable from "../components/pages/TimetablePage/Timetable";
import { Clock } from "../components/shared/Clock";

export default function TimetablePage() {
	const [stop, setStop] = useQueryState("stop", { defaultValue: "" });

	return (
		<main className="flex flex-col justify-center p-4 space-y-4 md:w-165 md:mx-auto md:p-0 md:pt-8">
			<Clock />
			<StopSelect stop={stop} setStop={setStop} />
			<Timetable stop={stop} />
		</main>
	);
}
