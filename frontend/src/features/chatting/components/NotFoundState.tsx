interface NotFoundStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function NotFoundState({ icon, title, description }: NotFoundStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center">
        {icon}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
