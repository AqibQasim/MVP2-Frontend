"use client";
import { useState } from "react";
import Button from "./Button";

function AdminCreateJob() {
  const [skills, setSkills] = useState([""]); // Initialize with one empty skill input

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const addSkillInput = () => {
    setSkills([...skills, ""]); // Add a new empty skill input
  };

  const removeSkillInput = (index) => {
    const newSkills = skills.filter((_, i) => i !== index); // Remove the selected skill input
    setSkills(newSkills);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Create Job</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input type="text" className="w-full rounded-full border p-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full rounded-3xl border p-2"
            rows="2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Experience</label>
          <select className="w-full rounded-full border p-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Commitment</label>
          <select className="w-full rounded-full border p-2">
            <option>Full Time</option>
            <option>Part Time</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est Length (weeks)</label>
          <input
            className="w-full rounded-full border p-2"
            type="number"
          ></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select className="w-full rounded-full border p-2">
            <option>Remote</option>
            <option>On Site</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Desired Start Date</label>
          <input className="w-full rounded-full border p-2" type="date"></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Workday Overlap (Hours)</label>
          <input
            className="w-full rounded-full border p-2"
            type="number"
            placeholder="5 hours required"
          ></input>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          {skills.map((skill, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                className="w-full rounded-full border p-2"
                value={skill}
                onChange={(event) => handleSkillChange(index, event)}
                placeholder={`Skill ${index + 1}`}
              />
              {skills.length > 1 && (
                <button
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
          <Button
            type="submit"
            className="rounded-full bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default AdminCreateJob;
