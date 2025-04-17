import { Separator } from "./ui/separator";

export default function ContentHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <p className="font-bold text-[20px]">{title}</p>
        </div>
        <div className="text-right">{children}</div>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
