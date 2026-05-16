import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
    value: string;
};

export default function InputLabel({ value, className = "", ...props }: Props) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 ${className}`.trim()}
        >
            {value}
        </label>
    );
}
