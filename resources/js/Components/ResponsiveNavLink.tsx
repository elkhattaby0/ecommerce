import { Link } from "@inertiajs/react";
import { ComponentProps, PropsWithChildren } from "react";

type Props = PropsWithChildren<ComponentProps<typeof Link> & { active?: boolean }>;

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}: Props) {
    return (
        <Link
            {...props}
            className={`block w-full border-l-4 py-2 ps-3 pe-4 text-start text-base font-medium transition ${
                active
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
            } ${className}`.trim()}
        >
            {children}
        </Link>
    );
}
