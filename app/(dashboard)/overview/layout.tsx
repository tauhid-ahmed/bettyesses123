type LayoutProps = {
  metrics: React.ReactNode;
  activity: React.ReactNode;
  stats: React.ReactNode;
};

export default function OverviewLayoutPage({
  metrics,
  activity,
  stats,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {metrics}
      {stats}
      {activity}
    </div>
  );
}
