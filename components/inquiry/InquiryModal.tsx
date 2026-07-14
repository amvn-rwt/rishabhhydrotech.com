"use client";

import type { ReactElement } from "react";

import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { InquiryFormDefaults } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type InquiryModalProps = {
  defaults?: InquiryFormDefaults;
  title?: string;
  description?: string;
  /** Label when using the default trigger button. */
  triggerLabel?: string;
  /** Custom trigger element passed to DialogTrigger `render`. */
  trigger?: ReactElement;
  triggerClassName?: string;
};

export function InquiryModal({
  defaults,
  title = "Get Best Price",
  description = "Share the make, type, and specs you need. We will reply with pricing and availability.",
  triggerLabel = "Get Best Price",
  trigger,
  triggerClassName,
}: InquiryModalProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          trigger ?? (
            <Button
              className={cn(
                "bg-accent text-white hover:bg-accent-hover",
                triggerClassName,
              )}
            />
          )
        }
      >
        {triggerLabel}
      </DialogTrigger>
      <DialogContent
        className="max-h-[min(90vh,40rem)] gap-4 overflow-y-auto sm:max-w-lg"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle className="type-h3">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <InquiryForm defaults={defaults} variant="modal" />
      </DialogContent>
    </Dialog>
  );
}
