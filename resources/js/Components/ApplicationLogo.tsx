type Props = {
    className?: string;
};

export default function ApplicationLogo({ className = "" }: Props) {
    return (
        <span className={className}>
            ecommerce
        </span>
    );
}
