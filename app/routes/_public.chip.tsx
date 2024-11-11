import { useState } from 'react';
import { ChipInput } from '~/components/ui/chip-input/ChipInput';

const TAGS = [
  { value: 'art', label: 'Art' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'music', label: 'Music' },
  { value: 'movies', label: 'Movies' },
  { value: 'dance', label: 'Dance' },
  { value: 'photography', label: 'Photography' },
  { value: 'design', label: 'Design' },
  { value: 'animation', label: 'Animation' },
];

export default function Index() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Select Tags</h1>
      <ChipInput
        options={TAGS}
        value={selectedTags}
        onChange={setSelectedTags}
        placeholder="Select tags..."
      />

      <div className="mt-4 text-sm text-gray-600">
        Selected: {selectedTags.length} tags
      </div>
    </div>
  );
}