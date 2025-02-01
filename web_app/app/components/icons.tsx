import type { LucideProps } from "lucide-react";
import { Eraser, Eye, EyeOff, Forward } from "lucide-react";

export const SendIcon = ({ ...props }: LucideProps) => <Forward {...props} />;
export const EraseIcon = ({ ...props }: LucideProps) => <Eraser {...props} />;
export const ShowIcon = ({ ...props }: LucideProps) => <Eye {...props} />;
export const HideIcon = ({ ...props }: LucideProps) => <EyeOff {...props} />;
