import { useSubmit } from '@remix-run/react';
import { Toggle, type ToggleProps } from '../ui/toggle/Toggle';

function TogglePublishedProduct({ id, onChange, ...props }: ToggleProps & { id: string }) {
  const submit = useSubmit();

  const handleOnChange = async (checked: boolean) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("published", String(checked));
    formData.append("action", 'actionToggleProductPublished');

    submit(formData, {
      method: "post",
      action: `?`,
      navigate: false,
      fetcherKey: "actionToggleProductPublished"
    });
  }

  return (
    <Toggle {...props} onChange={handleOnChange} size='xs' />
  )
}

export default TogglePublishedProduct