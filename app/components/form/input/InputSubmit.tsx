import { useIsSubmitting } from "remix-validated-form";
import Button from "~/components/button/Button";

export const InputSubmit = ({
  label = "Submit",
}: {
  label?: string;
}) => {
  const isSubmitting = useIsSubmitting();

  return <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : label}</Button>;
};