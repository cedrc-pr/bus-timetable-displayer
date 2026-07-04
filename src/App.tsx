import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TimetableDisplayPage from "./pages/TimetableDisplayPage";
import TimetablePage from "./pages/TimetablePage";

function App() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<NuqsAdapter>
				<BrowserRouter>
					<Routes>
						<Route path="*" element={<Navigate to={"/timetable/"} />} />
						<Route path="/timetable" element={<TimetablePage />} />
						<Route
							path="/timetable/display"
							element={<TimetableDisplayPage />}
						/>
					</Routes>
				</BrowserRouter>
			</NuqsAdapter>
		</QueryClientProvider>
	);
}

export default App;
