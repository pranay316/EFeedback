
const CourseCard = ({ course }) => {
  const { name, rating, enrolled, submission, semester } = course;

  return (
    <div className="bg-white rounded-lg shadow-md  shadow-black overflow-hidden mt-20">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>

        <p className="text-gray-600 mb-2">Semester: {semester}</p>
        <div className="flex items-center">
          <span className="text-gray-600">Rating: {rating.toFixed(2)}</span>
         
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <p className="text-sm text-gray-600">Enrolled: {enrolled}</p>
        <p className="text-sm text-gray-600">Submission: {submission}</p>
      </div>
    </div>
  );
};



export default CourseCard;