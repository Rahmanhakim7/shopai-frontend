type SelectionCheckboxProps = {
  checked: boolean;
  onClick: () => void;
};

export default function SelectionCheckbox({
  checked,
  onClick,
}: SelectionCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border transition ${
        checked ? "border-green-600 bg-green-600" : "border-gray-300 bg-white"
      }`}
    >
      {checked && (
        <svg
          className="h-3 w-3 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
          />
        </svg>
      )}
    </button>
  );
}
