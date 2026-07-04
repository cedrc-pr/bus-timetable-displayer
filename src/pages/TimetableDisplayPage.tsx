import { useQueryState } from "nuqs";
import TimetableDisplay from "../components/pages/TimetableDisplayPage/TimetableDisplay";
import { Clock } from "../components/shared/Clock";

export default function TimetableDisplayPage() {
  const [stop, setStop] = useQueryState("stop", { defaultValue: "" });

  return (
    <main className="flex justify-between h-screen p-20">
      <section className="flex flex-col justify-between w-[40%]">
        <h1 className="text-[14rem]">
          <Clock />
        </h1>
        <div>
          <label htmlFor="stop" className="text-[3rem] text-zinc-700">
            Arrêt
          </label>
          <h1 id="stop" className="text-[5rem] line-clamp-3 min-h-92">
            {stop}
          </h1>
        </div>
      </section>
      <section className="w-[55%]">
        <TimetableDisplay stop={stop} setStop={setStop} />
      </section>
    </main>
  );
}
