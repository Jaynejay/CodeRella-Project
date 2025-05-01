const RoleCard = () => {
  return (
    <div className="flex space-x-4 mb-4">
      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
        Paper Setter
      </button>
      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
        Exam Administrator
      </button>
      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
        Course Administrator
      </button>
      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
        Payment Co-ordinator
      </button>
    </div>
  );
};

export default RoleCard;
