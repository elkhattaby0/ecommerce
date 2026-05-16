import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
    { className = "", isFocused = false, type = "text", ...props },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLInputElement, []);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            ref={localRef}
            type={type}
            className={`rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`.trim()}
        />
    );
});

export default TextInput;
