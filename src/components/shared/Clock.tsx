import type React from "react";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";

export const Clock: React.FC = () => {
	const [now, setNow] = useState<Date>(() => new Date());
	const timeoutIdRef = useRef<number | null>(null);
	const intervalIdRef = useRef<number | null>(null);

	useEffect(() => {
		setNow(new Date());

		const now0 = new Date();
		const msToNextMinute =
			(60 - now0.getSeconds()) * 1000 - now0.getMilliseconds();

		timeoutIdRef.current = window.setTimeout(() => {
			setNow(new Date());
			intervalIdRef.current = window.setInterval(
				() => setNow(new Date()),
				60_000,
			);
		}, msToNextMinute);

		return () => {
			if (timeoutIdRef.current !== null) {
				window.clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
			if (intervalIdRef.current !== null) {
				window.clearInterval(intervalIdRef.current);
				intervalIdRef.current = null;
			}
		};
	}, []);

	return (
		<time dateTime={now.toISOString()} className="font-semibold">
			{formatTime(now)}
		</time>
	);
};
