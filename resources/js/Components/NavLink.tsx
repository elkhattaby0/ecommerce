import { Link } from "@inertiajs/react";
import { ComponentProps, PropsWithChildren } from "react";

type Props = PropsWithChildren<ComponentProps<typeof Link> & { active?: boolean }>;

export default function NavLink({ active = false, className = "", children, ...props }: Props) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition ${
                active
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } ${className}`.trim()}
        >
            {children}
        </Link>
    );
}
