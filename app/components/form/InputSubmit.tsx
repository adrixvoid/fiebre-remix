import Button from "~/components/button/Button";

export const InputSubmit = ({
  isSubmitting,
  label = "Submit",
}: {
  isSubmitting: boolean;
  label?: string;
}) => {
  return <Button color="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : label}</Button>;
};