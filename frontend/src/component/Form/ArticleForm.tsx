import { useState } from "react";

export const ArticleForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [errorMessage, _] = useState("");

	return (
		<form className="flex flex-col gap-2">
			<div className="flex justify-between">
				<label className="content-center" htmlFor="title">
					Title
				</label>
				<input
					className="rounded p-1"
					id="title"
					type="text"
					value={title}
					size={24}
					maxLength={256}
					placeholder="Please type your email"
					onChange={(event) => setTitle(event.currentTarget.value)}
					aria-required="true"
					aria-invalid={0 < errorMessage.length}
					aria-describedby="title-error"
				/>
			</div>
			<div className="flex justify-between">
				<label className="content-center" htmlFor="content">
					Content
				</label>
				<textarea
					className="rounded p-1"
					id="content"
					value={content}
					placeholder="Please type your article content"
					onChange={(event) => setContent(event.currentTarget.value)}
					aria-required="true"
					aria-invalid={0 < errorMessage.length}
					aria-describedby="title-error"
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="button"
					className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
					onClick={() => {}}
					aria-label="Post this article"
					disabled={!title || !content}
				>
					Post
				</button>
			</div>
		</form>
	);
};
