const UserDetail = (props) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <p className="text-2xl text-blue-900 font-medium">
        {props.firstName.replace(/^\w/, (c) => c.toUpperCase())}
      </p>
      <div className="flex justify-center items-center h-11 w-11 bg-blue-600 rounded-full">
        <p className="text-2xl text-white font-medium">
          {props.firstName.charAt(0).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
