import { X } from "lucide-react";
import { type ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
	children: ReactNode;
};

export type ModalRef = {
	showModal: () => void;
	close: () => void;
};

export const Modal = forwardRef<ModalRef, Props>(({ children }, modalRef) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(
		modalRef,
		() => ({
			showModal: () => {
				dialogRef.current?.showModal();
			},
			close: () => {
				dialogRef.current?.close();
			},
		}),
		[],
	);

	return (
		<dialog
			ref={dialogRef}
			className="rounded border-blue-200 border-2 p-2 w-4/5"
		>
			<header className="flex justify-end">
				<button
					type="button"
					onClick={() => {
						dialogRef.current?.close();
					}}
				>
					<X size={24} />
				</button>
			</header>
			<div>{children}</div>
		</dialog>
	);
});
