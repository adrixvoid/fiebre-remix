import { ToastContainer } from '~/components/ui/toast/ToastContainer';
import { useToast } from '~/hooks/useToast';

export default function ExampleRoute() {
  const { addToast } = useToast();

  const handleShowToast = () => {
    addToast('This is a toast message!');
  };

  return (
    <div>
      <h1>Toast Example</h1>
      <button onClick={handleShowToast}>Show Toast</button>
      <ToastContainer />
    </div>
  );
}

