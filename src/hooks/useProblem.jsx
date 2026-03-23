import React, { useEffect, useState } from "react";
import api from "../utils/api";


export function useProblem(page, limit = 10){
    const [problems, setProblems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(()=>{
        const fetchProblems = async ()=>{
            const res = await api.get(`/api/problems?pages${page}&limit=${limit}`);
            setProblems(res.data.problems);
            setTotalPages(res.data.totalPages);
        };
        fetchProblems();
    },[])

    return {problems, totalPages};
}

export function useSingleProblem(id){
    // const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(()=>{
    const data = async ()=>{
        const res = await api.get(`/api/singleProblem/${id}`)
        setProblem(res.data);
    };
    data();
  },[id]);
  return {problem};
}

