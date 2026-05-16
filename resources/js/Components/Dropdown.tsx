import { Link } from "@inertiajs/react";
import { ComponentProps, Fragment, PropsWithChildren, ReactNode, createContext, useContext, useState } from "react";

type InertiaLinkProps = ComponentProps<typeof Link>;

type DropdownContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error("Dropdown components must be used within Dropdown.");
    }

    return context;
}

function DropdownRoot({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className="relative">
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

function Trigger({ children }: { children: ReactNode }) {
    const { open, setOpen } = useDropdownContext();

    return (
        <div onClick={() => setOpen(!open)}>
            {children}
        </div>
    );
}

function Content({ children }: PropsWithChildren) {
    const { open, setOpen } = useDropdownContext();

    if (!open) {
        return null;
    }

    return (
        <Fragment>
            <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setOpen(false)}
            />
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                {children}
            </div>
        </Fragment>
    );
}

function DropdownLink({
    children,
    className = "",
    ...props
}: PropsWithChildren<InertiaLinkProps>) {
    const { setOpen } = useDropdownContext();

    return (
        <Link
            {...props}
            onClick={() => {
                setOpen(false);
            }}
            className={`block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 ${className}`.trim()}
        >
            {children}
        </Link>
    );
}

const Dropdown = Object.assign(DropdownRoot, {
    Trigger,
    Content,
    Link: DropdownLink,
});

export default Dropdown;
