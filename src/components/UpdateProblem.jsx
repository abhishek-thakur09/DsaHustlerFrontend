import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UpdateProblem = () => {
  const { id } = useParams(); //get id from edit problem whenever user click on the edit button this component will get id automatically..
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    tags: "",
    constraints: "",
    functionSignature: "",
    testCases: "",
  });

  console.log(id);

  // fetch problem

  const fetchProblem = async () => {
    const res = await api.get(BASE_URL + `api/singleProblem/${id}`);
    setFormData(res.data);
  };

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      console.log(id);

      await axios.patch(BASE_URL + `api/update-problem/${id}`, formdata);

      alert("Problem updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h2 className="font-bold text-5xl">Update Problem</h2>

      {/* TITLE */}
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={formdata.title}
        onChange={handleChange}
      />

      <br />
      <br />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Enter description"
        value={formdata.description}
        onChange={handleChange}
      />

      <br />
      <br />

      {/* DIFFICULTY */}
      <select
        name="difficulty"
        value={formdata.difficulty}
        onChange={handleChange}
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <br />
      <br />

      {/* TAGS */}
      <input
        type="text"
        name="tags"
        placeholder="Enter tags (comma separated)"
        value={formdata.tags}
        onChange={handleChange}
      />

      <br />
      <br />

      {/* CONSTRAINTS */}
      <textarea
        name="constraints"
        placeholder="Enter constraints"
        value={formdata.constraints}
        onChange={handleChange}
      />

      <br />
      <br />

      {/* FUNCTION SIGNATURE */}
      <textarea
        name="functionSignature"
        placeholder="Enter function signature"
        value={formdata.functionSignature}
        onChange={handleChange}
      />

      <br />
      <br />

      {/* TEST CASES */}
      <textarea
        name="testCases"
        placeholder="Enter test cases (JSON format)"
        value={formdata.testCases}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleUpdate}>Update Problem</button>
    </div>
  );
};

export default UpdateProblem;
