const tags = ["Pho", "Street food", "Quick", "Vegan", "Noodles", "Meal Prep", "Spicy"];

export function TagPills() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className="whitespace-nowrap rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
