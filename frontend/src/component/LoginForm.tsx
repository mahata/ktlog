import { authedAtom, toastMessageAtom } from "@/atoms";
import { useAuthRepository } from "@/repository/useAuthRepository";
import { useAtom } from "jotai/index";
import { useState } from "react";

type Props = {
	closeModal: () => void;
};

export const LoginForm = ({ closeModal }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [, setToastMessage] = useAtom(toastMessageAtom);
	const [, setAuthed] = useAtom(authedAtom);
	const { auth } = useAuthRepository();

	const sendLoginRequest = async () => {
		const authResult = await auth(email, password);
		if (authResult.success) {
			setToastMessage("Login successfully");
			setAuthed(true);
			closeModal();
		} else {
			setErrorMessage("Password is wrong");
		}
	};

	return (
		<form className="flex flex-col gap-2">
			<div className="flex justify-between">
				<label className="content-center" htmlFor="email">
					email
				</label>
				<input
					className="rounded p-1"
					id="email"
					type="email"
					value={email}
					size={24}
					maxLength={256}
					placeholder="Please type your email"
					onChange={(event) => setEmail(event.currentTarget.value)}
				/>
			</div>
			<div className="flex justify-between">
				<label className="content-center" htmlFor="password">
					password
				</label>
				<input
					className="rounded p-1"
					id="password"
					type="password"
					value={password}
					size={24}
					maxLength={256}
					placeholder="Please type your password"
					onChange={(event) => setPassword(event.currentTarget.value)}
					onKeyDown={async (event) => {
						if (event.key === "Enter") {
							await sendLoginRequest();
						}
					}}
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="button"
					className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
					onClick={async () => {
						await sendLoginRequest();
					}}
				>
					Send
				</button>
			</div>
			<div>{errorMessage}</div>
		</form>
	);
};
