import { EditIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function ActionColumn({
  record,
  index,
  updateCallback,
  deleteCallback,
}: {
  record: any & { created_at: string; updated_at?: string; id: any };
  index?: number;
  updateCallback?: (record: any, index?: number) => void; // eslint-disable-line no-unused-vars
  deleteCallback: (id: any) => void; // eslint-disable-line no-unused-vars
}) {
  return (
    <>
      <Button
        variant="link"
        size="icon"
        onClick={() => updateCallback?.(record, index)}
      >
        <EditIcon className="size-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger>
          <TrashIcon className="size-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete and
              remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCallback(record.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
