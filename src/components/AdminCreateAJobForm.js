"use client";
import { createAJobAction } from "@/lib/actions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

function AdminCreateAJobForm({ clientId }) {
  const [skills, setSkills] = useState([""]);
  const [applicationQuestions, setApplicationQuestions] = useState([""]);

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...applicationQuestions];
    newQuestions[index] = event.target.value;
    setApplicationQuestions(newQuestions);
  };

  const addSkillInput = () => {
    setSkills([...skills, ""]);
  };

  const addQuestionInput = () => {
    setApplicationQuestions([...applicationQuestions, ""]);
  };

  const removeSkillInput = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const removeQuestionInput = (index) => {
    const newQuestions = applicationQuestions.filter((_, i) => i !== index);
    setApplicationQuestions(newQuestions);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Create Job</h2>
      <form action={createAJobAction}>
        <div className="mb-4">
          <input
            type="hidden"
            id="clientId"
            name="client_id"
            value={clientId}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700">
            Job Title
          </label>
          <input
            id="position"
            name="position"
            type="text"
            className="w-full rounded-full border p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full rounded-3xl border p-2"
            rows="2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700">
            Experience
          </label>
          <select
            id="experience"
            name="experience"
            className="w-full rounded-full border p-2"
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="commitment" className="block text-gray-700">
            Commitment
          </label>
          <select
            id="commitment"
            name="commitment"
            className="w-full rounded-full border p-2"
            required
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="project_length" className="block text-gray-700">
            Project Length (in months)
          </label>
          <input
            id="project_length"
            name="project_length"
            className="w-full rounded-full border p-2"
            type="number"
            placeholder="e.g. 1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="job_type" className="block text-gray-700">
            Job Type
          </label>
          <select
            id="job_type"
            name="job_type"
            className="w-full rounded-full border p-2"
            required
          >
            <option value="remote">Remote</option>
            <option value="on-site">On Site</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="start_date" className="block text-gray-700">
            Desired Start Date
          </label>
          <input
            id="start_date"
            name="start_date"
            className="w-full rounded-full border p-2"
            type="date"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            className="w-full rounded-full border p-2"
            type="text"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workday_overlap" className="block text-gray-700">
            Workday Overlap (in Hours)
          </label>
          <input
            id="workday_overlap"
            name="workday_overlap"
            className="w-full rounded-full border p-2"
            type="number"
            placeholder="e.g. 5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="is_test_required" className="block text-gray-700">
            Is Test Required
          </label>
          <select
            id="is_test_required"
            name="is_test_required"
            className="w-full rounded-full border p-2"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700">
            Skills
          </label>
          {skills.map((skill, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                id={`skill${index}`}
                name="skills"
                type="text"
                className="w-full rounded-full border p-2"
                value={skill}
                onChange={(event) => handleSkillChange(index, event)}
                placeholder={`Skill ${index + 1}`}
                required
              />
              {skills.length > 1 && (
                <button
                  type="button"
                  className="ml-2 rounded-full bg-red-500 p-2 text-white"
                  onClick={() => removeSkillInput(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="rounded-full bg-green-600 p-1 text-white"
            onClick={addSkillInput}
            type="button"
          >
            Add more
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="application_questions"
            className="block text-gray-700"
          >
            Application Questions
          </label>
          {applicationQuestions.map((question, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                id={`question${index}`}
                name="application_questions"
                type="text"
                className="w-full rounded-full border p-2"
                value={question}
                onChange={(event) => handleQuestionChange(index, event)}
                placeholder={`Question ${index + 1}`}
                required
              />
              {applicationQuestions.length > 1 && (
                <button
                  type="button"
                  className="ml-2 rounded-full bg-red-500 p-2 text-white"
                  onClick={() => removeQuestionInput(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="rounded-full bg-green-600 p-1 text-white"
            onClick={addQuestionInput}
            type="button"
          >
            Add more
          </button>
        </div>

        <div className="flex justify-end">
          <SubmitButton pendingLabel="Creating...">Create Job</SubmitButton>
        </div>
      </form>
    </>
  );
}

export default AdminCreateAJobForm;
