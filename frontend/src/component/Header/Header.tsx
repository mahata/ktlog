import { authedAtom } from "@/atoms";
import { LoginForm } from "@/component/LoginForm";
import { Modal, type ModalRef } from "@/component/Modal/Modal";
import { useAuthRepository } from "@/repository/useAuthRepository";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const modalRef = useRef<ModalRef>(null);
	const [authed, setAuthed] = useAtom(authedAtom);
	const { getAuthStatus } = useAuthRepository();

	useEffect(() => {
		getAuthStatus().then((response) => {
			if (response.success) {
				setAuthed(response.data.authed);
			}
		});
	}, [getAuthStatus, setAuthed]);

	return (
		<header className="w-full bg-blue-400 shadow shadow-blue-600">
			<nav className="flex h-14 justify-between">
				<div className="content-center px-4 py-1.5">
					<Link to="/">
						<img
							className="h-8 rounded shadow-lg"
							src="/ktlog.webp"
							alt="Site Logo"
						/>
					</Link>
				</div>
				<div className="p-3">
					{authed ? (
						<button
							type="button"
							className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
							onClick={() => {}}
						>
							Post
						</button>
					) : (
						<button
							type="button"
							className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
							onClick={() => modalRef.current?.showModal()}
						>
							Login
						</button>
					)}
				</div>
				<Modal ref={modalRef}>
					<LoginForm closeModal={() => modalRef.current?.close()} />
				</Modal>
			</nav>
		</header>
	);
}
