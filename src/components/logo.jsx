const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="flex justify-center items-center gap-2">
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-500 font-sans">
          T
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 font-sans">
          O
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 font-sans">
          K
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 font-sans">
          A
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 font-sans">
          I
        </p>
      </div>
      <div className="flex justify-center items-center rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 text-[6px] sm:text-[7px] md:text-[8px] px-2 sm:px-3 md:px-4 tracking-wide font-medium text-white font-sans dec">
        - TRADE CLUB & SCHOOL -
      </div>
    </div>
  );
};

export default Logo;
