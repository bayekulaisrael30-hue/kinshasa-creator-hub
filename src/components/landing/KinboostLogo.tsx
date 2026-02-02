interface KinboostLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const KinboostLogo = ({ className = "", showText = true, size = "md" }: KinboostLogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Stylized K Arrow Logo */}
      <svg
        viewBox="0 0 48 48"
        className={`${sizeClasses[size]} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main K shape with arrow */}
        <path
          d="M8 8V40H16V28L28 40H40L24 24L38 10H26L16 20V8H8Z"
          className="fill-primary"
        />
        {/* Arrow accent pointing right */}
        <path
          d="M32 8L44 20L32 20L32 8Z"
          className="fill-primary"
        />
      </svg>
      
      {showText && (
        <span className={`font-display font-bold text-foreground tracking-tight ${textSizeClasses[size]}`}>
          KINBOOST
        </span>
      )}
    </div>
  );
};

export default KinboostLogo;
