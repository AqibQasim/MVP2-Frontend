"use client"
import React, { useState } from 'react';
import AdminJobsList from '@/components/AdminJobsList';
import Button from '@/components/Button';
import Modal from '@/components/AdminJobsFormModal';
import AvailabilityDropdown from '@/components/AvailabilityDropdown';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState(['']); // Initialize with one empty skill input

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const addSkillInput = () => {
    setSkills([...skills, '']); // Add a new empty skill input
  };

  const removeSkillInput = (index) => {
    const newSkills = skills.filter((_, i) => i !== index); // Remove the selected skill input
    setSkills(newSkills);
  };

  return (
    <>
      <header className="rounded-4xl bg-neutral-white p-4 flex justify-between">
        <div className='font-bold text-2xl'>Admin</div>
        <Button className="rounded-full" onClick={openModal}>Create a Job</Button>
      </header>

      <AdminJobsList />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Create Job</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Job Title</label>
            <input type="text" className="border rounded-full p-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea className="border p-2 w-full rounded-full" rows="2"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience</label>
            <select className='border rounded-full p-2 w-full'>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Commitment</label>
            <select className='border rounded-full p-2 w-full'>
              <option>Full Time</option>
              <option>Part Time</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Est Length (weeks)</label>
            <input className="border rounded-full p-2 w-full" type='number'></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Type</label>
            <select className='border rounded-full p-2 w-full'>
              <option>Remote</option>
              <option>On Site</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Desired Start Date</label>
            <input className="border rounded-full p-2 w-full" type='date'></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Workday Overlap (Hours)</label>
            <input className="border rounded-full p-2 w-full" type='number' placeholder='5 hours required'></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Skills</label>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="border rounded-full p-2 w-full"
                  value={skill}
                  onChange={(event) => handleSkillChange(index, event)}
                  placeholder={`Skill ${index + 1}`}
                />
                {skills.length > 1 && (
                  <button
                    className="ml-2 rounded-full bg-red-500 text-white p-2"
                    onClick={() => removeSkillInput(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              className="rounded-full bg-green-600 text-white p-1 "
              onClick={addSkillInput}
              type="button"
            >
              Add more
            </button>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full bg-blue-500 text-white px-4 py-2">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Page;
