type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {icon && <div className="mb-4 text-5xl">{icon}</div>}

      <h3 className="text-xl font-bold text-zinc-700">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-zinc-500 text-center">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}