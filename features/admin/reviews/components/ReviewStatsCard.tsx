import { LucideIcon } from "lucide-react";

interface ReviewStatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export const ReviewStatsCard = ({ icon: Icon, value, label }: ReviewStatsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <h3 className="text-[36px] font-semibold text-dark-800">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-700" />
      </div>
    </div>
  );
};
