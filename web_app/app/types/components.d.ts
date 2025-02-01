interface InputProps {
    label?: string;
    input: React.InputHTMLAttributes<HTMLInputElement>;
    btn?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    icon?: React.ReactNode;
    containerClass?: string;
    errors?: string[];
}