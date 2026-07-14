"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  emptyInquiryFormValues,
  getInquiryBrandOptions,
  getInquiryCategoryOptions,
  resolveInquiryProductLabel,
  submitInquiry,
  validateInquiryForm,
  type InquiryFieldErrors,
  type InquiryFormDefaults,
  type InquiryFormValues,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

type InquiryFormProps = {
  defaults?: InquiryFormDefaults;
  /** Compact layout for dialogs. */
  variant?: "page" | "modal";
  className?: string;
  onSuccess?: () => void;
};

export function InquiryForm({
  defaults,
  variant = "page",
  className,
  onSuccess,
}: InquiryFormProps) {
  const formId = useId();
  const categoryOptions = getInquiryCategoryOptions();
  const [values, setValues] = useState<InquiryFormValues>(() =>
    emptyInquiryFormValues(defaults),
  );
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [attachment, setAttachment] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const productLabel = resolveInquiryProductLabel(defaults?.product);
  const brandOptions = getInquiryBrandOptions(values.category || undefined);
  const isModal = variant === "modal";

  const categoryItems = [
    { label: "Select a category", value: null as string | null },
    ...categoryOptions.map((option) => ({
      label: option.label,
      value: option.value,
    })),
  ];
  const brandItems = [
    { label: "No preference", value: null as string | null },
    ...brandOptions.map((brand) => ({ label: brand, value: brand })),
  ];

  function updateField<K extends keyof InquiryFormValues>(
    key: K,
    value: InquiryFormValues[K],
  ) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      if (key === "category") {
        const nextBrands = getInquiryBrandOptions(value || undefined);
        if (current.brand && !nextBrands.includes(current.brand)) {
          next.brand = "";
        }
      }
      return next;
    });
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateInquiryForm(values);
    if (attachment && attachment.size > MAX_ATTACHMENT_BYTES) {
      nextErrors.attachment = "File must be 5 MB or smaller.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const result = await submitInquiry({
      ...values,
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      quantity: values.quantity.trim(),
      message: values.message.trim(),
      division: defaults?.division || "hydraulic",
      productId: defaults?.product,
      productName: productLabel,
      attachmentName: attachment?.name,
      attachmentSize: attachment?.size,
      attachmentType: attachment?.type,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    setIsSuccess(true);
    onSuccess?.();
  }

  if (isSuccess) {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 border border-border bg-white p-6",
          isModal && "border-0 p-0",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <CheckCircle2Icon
              className="size-6 shrink-0 text-brand"
              aria-hidden="true"
            />
            <h2 className="type-h3 text-neutral-dark">Inquiry received</h2>
          </div>
          <p className="type-body text-pretty text-muted-foreground">
            Thanks. We will review your requirements and reply with pricing and
            availability.
          </p>
        </div>
        {!isModal ? (
          <div className="flex flex-wrap gap-3">
            <Button
              render={<Link href="/products/hydraulic" />}
              nativeButton={false}
              className="bg-accent text-white hover:bg-accent-hover"
            >
              Browse catalogue
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setValues(emptyInquiryFormValues(defaults));
                setAttachment(null);
                setIsSuccess(false);
              }}
            >
              Send another inquiry
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setValues(emptyInquiryFormValues(defaults));
              setAttachment(null);
              setIsSuccess(false);
            }}
          >
            Send another inquiry
          </Button>
        )}
      </div>
    );
  }

  const nameId = `${formId}-name`;
  const phoneId = `${formId}-phone`;
  const emailId = `${formId}-email`;
  const companyId = `${formId}-company`;
  const categoryId = `${formId}-category`;
  const brandId = `${formId}-brand`;
  const quantityId = `${formId}-quantity`;
  const messageId = `${formId}-message`;
  const attachmentId = `${formId}-attachment`;
  const honeypotId = `${formId}-website`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "relative flex flex-col gap-6 border border-border bg-white p-6 sm:p-8",
        isModal && "border-0 p-0",
        className,
      )}
    >
      {productLabel ? (
        <p className="type-body text-neutral-dark">
          Product: <span className="font-medium">{productLabel}</span>
        </p>
      ) : null}

      <FieldGroup className={cn(isModal ? "gap-4" : "gap-5")}>
        <div
          className={cn(
            "grid gap-5",
            !isModal && "sm:grid-cols-2",
            isModal && "gap-4",
          )}
        >
          <Field data-invalid={Boolean(errors.name) || undefined}>
            <FieldLabel htmlFor={nameId}>
              Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id={nameId}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name) || undefined}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              required
            />
            {errors.name ? (
              <FieldError id={`${nameId}-error`}>{errors.name}</FieldError>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(errors.phone) || undefined}>
            <FieldLabel htmlFor={phoneId}>
              Phone <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id={phoneId}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone) || undefined}
              aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
              required
            />
            {errors.phone ? (
              <FieldError id={`${phoneId}-error`}>{errors.phone}</FieldError>
            ) : null}
          </Field>
        </div>

        <div
          className={cn(
            "grid gap-5",
            !isModal && "sm:grid-cols-2",
            isModal && "gap-4",
          )}
        >
          <Field data-invalid={Boolean(errors.email) || undefined}>
            <FieldLabel htmlFor={emailId}>Email</FieldLabel>
            <Input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
            />
            {errors.email ? (
              <FieldError id={`${emailId}-error`}>{errors.email}</FieldError>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor={companyId}>Company</FieldLabel>
            <Input
              id={companyId}
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </Field>
        </div>

        <div
          className={cn(
            "grid gap-5",
            !isModal && "sm:grid-cols-2",
            isModal && "gap-4",
          )}
        >
          <Field data-invalid={Boolean(errors.category) || undefined}>
            <FieldLabel htmlFor={categoryId}>
              Category <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              items={categoryItems}
              value={values.category || null}
              onValueChange={(value) => updateField("category", value ?? "")}
              name="category"
              id={categoryId}
              required
              modal={false}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={Boolean(errors.category) || undefined}
                aria-describedby={
                  errors.category ? `${categoryId}-error` : undefined
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryItems.map((item) => (
                    <SelectItem
                      key={item.value ?? "category-placeholder"}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category ? (
              <FieldError id={`${categoryId}-error`}>
                {errors.category}
              </FieldError>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor={brandId}>Brand preference</FieldLabel>
            <Select
              items={brandItems}
              value={values.brand || null}
              onValueChange={(value) => updateField("brand", value ?? "")}
              name="brand"
              id={brandId}
              modal={false}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brandItems.map((item) => (
                    <SelectItem
                      key={item.value ?? "brand-placeholder"}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor={quantityId}>Quantity</FieldLabel>
          <Input
            id={quantityId}
            name="quantity"
            inputMode="numeric"
            value={values.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            placeholder="e.g. 2 sets"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={messageId}>Requirements</FieldLabel>
          <Textarea
            id={messageId}
            name="message"
            rows={isModal ? 3 : 5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Model number, pressure rating, bore/stroke, fittings, or other specs"
          />
          <FieldDescription>
            Include make, type, and sizes from the machine plate when you have
            them.
          </FieldDescription>
        </Field>

        <Field data-invalid={Boolean(errors.attachment) || undefined}>
          <FieldLabel htmlFor={attachmentId}>Drawing or photo</FieldLabel>
          <Input
            id={attachmentId}
            name="attachment"
            type="file"
            accept="image/*,application/pdf,.pdf"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setAttachment(file);
              setErrors((current) => {
                if (!current.attachment) return current;
                const next = { ...current };
                delete next.attachment;
                return next;
              });
            }}
            aria-invalid={Boolean(errors.attachment) || undefined}
            aria-describedby={
              errors.attachment
                ? `${attachmentId}-error`
                : `${attachmentId}-hint`
            }
          />
          <FieldDescription id={`${attachmentId}-hint`}>
            Optional. Images or PDF, up to 5 MB.
          </FieldDescription>
          {errors.attachment ? (
            <FieldError id={`${attachmentId}-error`}>
              {errors.attachment}
            </FieldError>
          ) : null}
        </Field>

        {/* Honeypot — hidden from users, checked on submit / future API. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={honeypotId}>Website</label>
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </div>
      </FieldGroup>

      {formError ? (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="bg-accent px-5 text-white hover:bg-accent-hover"
        >
          {isSubmitting ? "Sending..." : "Request best price"}
        </Button>
        {!isModal ? (
          <p className="type-caption text-muted-foreground">
            Required fields marked with *
          </p>
        ) : null}
      </div>
    </form>
  );
}
