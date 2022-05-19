import ReactChipInput from "react-chip-input";

const ThreadTags = ({ threadTags, setThreadInput }) => {
  const addChip = (value) => {
    if (threadTags.length < 5 && value.trim() !== "") {
      const chips = threadTags.slice();
      chips.push(value);
      setThreadInput((prev) => ({ ...prev, tags: chips }));
    }
  };
  const removeChip = (index) => {
    const chips = threadTags.slice();
    chips.splice(index, 1);
    setThreadInput((prev) => ({ ...prev, tags: chips }));
  };

  return (
    <ReactChipInput
      chips={threadTags}
      onSubmit={(value) => addChip(value)}
      onRemove={(index) => removeChip(index)}
    />
  );
};

export { ThreadTags };
