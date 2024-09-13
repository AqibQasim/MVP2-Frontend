"use client";
import { createAJobAction } from "@/lib/actions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

function AdminCreateAJobForm({ clientId }) {
  const [skills, setSkills] = useState([""]);

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const addSkillInput = () => {
    setSkills([...skills, ""]);
  };

  const removeSkillInput = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Create Job</h2>
      <form action={createAJobAction}>
        <div className="mb-4">
          <label htmlFor="clientId" className="hidden">
            <input
              type="hidden"
              id="clientId"
              name="clientId"
              value={clientId}
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="jobTitle" className="block text-gray-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
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
            <option value="full time">Full Time</option>
            <option value="part time">Part Time</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="estLength" className="block text-gray-700">
            Est Length (weeks)
          </label>
          <input
            id="estLength"
            name="estLength"
            className="w-full rounded-full border p-2"
            type="number"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="jobType" className="block text-gray-700">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            className="w-full rounded-full border p-2"
            required
          >
            <option value="remote">Remote</option>
            <option value="on site">On Site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700">
            Desired Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            className="w-full rounded-full border p-2"
            type="date"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workdayOverlap" className="block text-gray-700">
            Workday Overlap (Hours)
          </label>
          <input
            id="workdayOverlap"
            name="workdayOverlap"
            className="w-full rounded-full border p-2"
            type="number"
            placeholder="5 hours required"
            min="0"
            required
          />
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

        <div className="flex justify-end">
          <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
        </div>
      </form>
    </>
  );
}

export default AdminCreateAJobForm;
