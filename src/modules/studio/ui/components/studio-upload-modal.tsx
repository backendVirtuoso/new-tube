"use client";

import { toast } from "sonner";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { ResponsiveModal } from "@/components/reponsive-modal";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModel = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created");
      utils.studio.getMany.invalidate()
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <>
      <ResponsiveModal
        title="Upload a vidoe"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url
          ? <StudioUploader endpoint={create.data.url} onSuccess={() => { }} />
          : <Loader2Icon />
        }
      </ResponsiveModal>
      <Button variant="secondary" onClick={() => create.mutate()} disabled={create.isPending}>
        {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
        Create
      </Button>
    </>
  );
};
