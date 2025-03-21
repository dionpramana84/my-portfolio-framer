import { Skeleton } from "./ui/skeleton";

export default function Description({
  title,
  description,
  loading,
}: {
  title?: string | null;
  description?: string | null;
  loading?: boolean | null;
}) {
  return (
    <div className="mb-8">
      {loading ? (
        <>
          <Skeleton className="h-4 w-36 mb-2" />
          <Skeleton className="h-4 w-64" />
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <p>{description}</p>
        </>
      )}
    </div>
  );
}
