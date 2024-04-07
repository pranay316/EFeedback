import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({ courseName,id }) => {
  const [feedback, setFeedback] = useState({
    qualityOfContent: 0,
    meetingExpectations: 0,
    engagementLevel: 0,
    clearLearningObjectives: 0,
    instructorEffectiveness: 0,
    courseOrganization: 0,
    helpfulnessOfAssignments: 0,
    instructorResponsiveness: 0,
    likelihoodOfRecommendation: 0,
    overallSatisfaction: 0
  });
  const navigate=useNavigate();

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: parseInt(value) });
  };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let total=0;
        for (const key in feedback) {
            total+=feedback[key];
        }
        const avg=total/10;
        const res=await axios.post(`http://localhost:4000/api/v1/submitrating/${id}`,{rating:avg})
        alert(res.data.msg)
        navigate("/student")

    }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className='mb-16'>
      <h2 className="text-lg font-bold mb-4">Feedback for {courseName}</h2>
      <div className="flex flex-col space-y-4 ">
        <Question name="qualityOfContent" label="How would you rate the overall quality of the course content?" value={feedback.qualityOfContent} onChange={handleRatingChange} />
        <Question name="meetingExpectations" label="Did the course meet your expectations?" value={feedback.meetingExpectations} onChange={handleRatingChange} />
        <Question name="engagementLevel" label="How engaging were the course materials?" value={feedback.engagementLevel} onChange={handleRatingChange} />
        <Question name="clearLearningObjectives" label="Were the learning objectives clear and well-defined?" value={feedback.clearLearningObjectives} onChange={handleRatingChange} />
        <Question name="instructorEffectiveness" label="How effective was the course instructor in delivering the content?" value={feedback.instructorEffectiveness} onChange={handleRatingChange} />
        <Question name="courseOrganization" label="How organized and structured was the course?" value={feedback.courseOrganization} onChange={handleRatingChange} />
        <Question name="helpfulnessOfAssignments" label="Were the assignments and assessments helpful in reinforcing the concepts?" value={feedback.helpfulnessOfAssignments} onChange={handleRatingChange} />
        <Question name="instructorResponsiveness" label="How accessible and responsive was the instructor to your questions and concerns?" value={feedback.instructorResponsiveness} onChange={handleRatingChange} />
        <Question name="likelihoodOfRecommendation" label="Would you recommend this course to others?" value={feedback.likelihoodOfRecommendation} onChange={handleRatingChange} />
        <Question name="overallSatisfaction" label="Overall, how satisfied are you with this course?" value={feedback.overallSatisfaction} onChange={handleRatingChange} />
      </div>
    </div> 
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white block px-3  mx-auto font-bold py-2 rounded">Submit Feedback</button>
    </form>
  );
};

const Question = ({ name, label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-700">{label}</p>
      <select name={name} value={value} onChange={onChange} className="block w-32 py-1 px-2 border border-gray-300 rounded">
        {[...Array(6).keys()].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
    </div>
  );
};

export default FeedbackForm;
