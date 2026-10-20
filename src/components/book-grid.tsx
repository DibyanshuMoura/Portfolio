import type { Book } from "@/lib/reads";

function Cover({ book }: { book: Book }) {
  const { cover } = book;

  return (
    <div className="book-cover relative aspect-[2/3] overflow-hidden rounded-sm border border-border bg-card">
      <img
        src={cover.src}
        alt={`Cover of ${book.title}`}
        width={cover.width}
        height={cover.height}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export function BookGrid({ books }: { books: readonly Book[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
      {books.map((book, index) => (
        <li
          key={book.title}
          className="book animate-rise"
          style={{ animationDelay: `${(index + 1) * 70}ms` }}
        >
          <Cover book={book} />
          <h3 className="mt-3 text-[0.8125rem] font-bold leading-snug text-foreground normal-case">
            {book.title}
          </h3>
          <p className="mt-0.5 text-[0.75rem] leading-snug text-muted-foreground normal-case">
            {book.author}
          </p>
        </li>
      ))}
    </ul>
  );
}
