/* eslint-disable react/prop-types */

const BookItem = (props) => {
  const { book } = props;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:my-0 my-3">
      <div>
        <img
          className="rounded-t-lg w-full h-52"
          src={`${book.bookCover}`}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {book.bookName}
          </h5>
          <p className="my-2 font-normal text-gray-700 dark:text-gray-400">
            {book.author}
          </p>
          <a
            href={book.bookPDF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Read Book
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
