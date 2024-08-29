import { Route, Routes } from "react-router-dom";
import Post from "./Post";
import EyeCatch from "./component/EyeCatch/EyeCatch";
import Header from "./component/Header/Header";
import Toast from "./component/Toast/Toast";
import ArticlePage from "./page/ArticlePage/ArticlePage";
import TopPage from "./page/TopPage/TopPage";

export default function App() {
	if (
		["ktlog.local", "localhost", "127.0.0.1"].includes(
			window.location.hostname,
		) &&
		!document.title.startsWith("dev|")
	) {
		document.title = `dev|${document.title}`;
	}

	return (
		<div>
			<Header />
			<EyeCatch />
			<Routes>
				<Route path="/" element={<TopPage />} />
				<Route path="/articles/:id" element={<ArticlePage />} />
				<Route path="/post" element={<Post />} />
			</Routes>
			<Toast />
		</div>
	);
}
