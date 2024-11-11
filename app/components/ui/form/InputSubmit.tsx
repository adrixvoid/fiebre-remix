import { useIsSubmitting } from "remix-validated-form";
import Button from "~/components/ui/button/Button";

export const InputSubmit = ({
  isSubmitting,
  label = "Submit",
}: {
  isSubmitting?: boolean;
  label?: string;
}) => {
  return <Button asChild disabled={isSubmitting} variant='primary'><input type="submit" value={isSubmitting ? "Submitting..." : label} /></Button>;
};

export const InputSubmitValidator = ({
  label = "Submit",
}: {
  label?: string;
}) => {
  const isSubmitting = useIsSubmitting();
  return <InputSubmit isSubmitting={isSubmitting} label={label} />;
};