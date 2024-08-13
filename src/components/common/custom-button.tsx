import { memo } from "react";
import { IconType } from "react-icons";
import { TranslatedText } from "./translated-text";

type ButtonType = "primary-opaque" | "primary-ghost" | "secondary-opaque" | "secondary-ghost";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: ButtonType;
  icon?: IconType;
};

const Component: React.FC<Props> = ({ size, variant, ...props }) => {
  const selectedSize = size || "sm";
  const selectedVariant = variant || "primary-opaque";
  let buttonClass = "flex items-center gap-2 button button-" + selectedVariant;
  let iconClass = `icon`;

  switch (selectedSize) {
    case "xs":
      buttonClass += " text-xs";
      iconClass += " w-3 h-3";
      break;
    case "sm":
      buttonClass += " text-sm";
      iconClass += " w-4 h-4";
      break;
    case "md":
      buttonClass += " text-md";
      iconClass += " w-5 h-5";
      break;
    case "lg":
      buttonClass += " text-lg";
      iconClass += " w-6 h-6";
      break;
  }

  return (
    <button {...props} className={`${buttonClass} ${props.className || ""}`}>
      {props.icon && <props.icon className={iconClass} />}
      {props.children}
    </button>
  );
};

export const CustomButton = memo(Component);
