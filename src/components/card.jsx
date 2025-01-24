const Card = ({ title, value, img, bg }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm flex justify-between items-center w-full p-4">
      <div className="flex flex-col justify-start items-start">
        <p className="text-md">{title}</p>
        <p className="text-lg">{value}</p>
      </div>
      <img src={img} alt={img} className={`${bg} p-2 h-10 rounded-lg`} />
    </div>
  );
};

export default Card;
