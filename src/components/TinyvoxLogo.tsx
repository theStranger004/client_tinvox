import Image from "next/image";

interface TinyvoxLogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "transparent" | "solid";
  priority?: boolean;
}

export default function TinyvoxLogo({
  className = "",
  width = 160,
  height = 160,
  variant = "transparent",
  priority = false,
}: TinyvoxLogoProps) {
  const src = variant === "solid" ? "/logo.png" : "/logo-transparent.png";
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt="Tinyvox Logo"
        width={width}
        height={height}
        className="object-contain max-w-full"
        priority={priority}
      />
    </div>
  );
}
