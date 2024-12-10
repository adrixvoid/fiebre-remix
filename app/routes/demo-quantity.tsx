import { Quantity } from '~/components/ui/form/quantity/Quantity';

export default function QuantityDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Quantity Component Demo</h1>
      <Quantity
        initialValue={1}
        min={1}
        max={10}
        onChange={(value) => console.log(`New quantity: ${value}`)}
      />
    </div>
  );
}

