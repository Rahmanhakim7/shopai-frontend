type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-2xl bg-white px-4 py-2 text-sm text-gray-600 shadow-sm ring-1 ring-green-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
            currentPage === page
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
              : "bg-white text-gray-600 shadow-sm ring-1 ring-green-100 hover:-translate-y-0.5 hover:shadow-md"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-2xl bg-white px-4 py-2 text-sm text-gray-600 shadow-sm ring-1 ring-green-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
