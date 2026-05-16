import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function DangerButton({ className = "", children, ...props }: Props) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
        >
            {children}
        </button>
    );
}
