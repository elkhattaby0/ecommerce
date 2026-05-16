import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function PrimaryButton({ className = "", children, ...props }: Props) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
        >
            {children}
        </button>
    );
}
