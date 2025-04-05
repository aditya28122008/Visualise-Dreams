const TopTitle = ({ title, tagline }) => {
  return (
    <div className="lg:scale-125 xl:scale-150 dark:lg:scale-125 dark:xl:scale-150 dark:md:scale-90 lg:my-4 lg:mb-14 mb-6 sm:scale-100 scale-100 dark:sm:scale-50">
      <section className="text-gray-600 body-font transition-all duration-300">
        <div className="container px-5 mx-auto transition-all duration-300">
          <div className="flex flex-wrap transition-all duration-300 mx-auto rounded-full pt-8 pb-2 flex-col items-center text-center dark:shadow-none dark:italic shadow-md w-fit lg:whitespace-nowrap">
            <h1 className="sm:text-3xl transition-all duration-300 title-font text-blue-500 dark:text-white md:dark:text-5xl dark:text-2xl md:text-4xl lg:text-5xl dark:sm:text-4xl rounded-full px-4 font-bold font-serif uppercase">
              {title}
            </h1>
            <p className="lg:w-1/2 w-full transition-all duration-300 leading-relaxed text-pink-500 dark:text-blue-500 font-serif">
              {tagline}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopTitle;
