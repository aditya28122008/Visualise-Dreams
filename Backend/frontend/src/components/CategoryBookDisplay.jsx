import { Link } from "react-router-dom";
import BookItemSearch from "./BookItemSearch";
import { useEffect } from "react";


const CategoryBookDisplay = (props) => {

  useEffect(() => {
    console.log(props.books);    
  }, [])
  return (
    <div className="lg:my-52 my-8">
      <div className="lg:text-8xl italic font-Oswald lg:mb-8 text-2xl sm:text-4xl md:text-6xl md:mb-4">
        {props.books.cat}:-
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 w-fit mx-auto">
        {props.books.books.slice(0, 8).map((book) => {
          return <BookItemSearch key={book.bookSno} book={book} />;
        })}
      </div>
      {props.books.books.length > 8 && (
        <div className="relative z-10 my-10">
          <Link
            to={`/b-cat/${props.books.cat}`}
            className="absolute bg-blue-600 hover:bg-blue-400 text-white px-2 py-1 rounded-md right-0 bottom-0 flex items-center"
          >
            <div>Show More</div>
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
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryBookDisplay;
