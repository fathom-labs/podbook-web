import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DashboardActionCard = ({
  title,
  description,
  icon,
  onClick,
  className
}: DashboardActionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative p-8 rounded-lg border transition-all duration-300 cursor-pointer",
        "bg-dashboard-card border-dashboard-card-border shadow-card",
        "hover:bg-dashboard-card-hover hover:border-dashboard-card-border-hover hover:shadow-card-hover",
        "hover:bg-gradient-hover",
        "transform hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
    >
      {/* Icon container with glow effect */}
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-gradient-primary border border-dashboard-card-border group-hover:animate-glow transition-all duration-300">
          <div className="text-icon-glow text-xl">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-icon-glow transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed text-base">
          {description}
        </p>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </div>
  );
};