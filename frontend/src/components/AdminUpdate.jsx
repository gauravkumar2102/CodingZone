import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate, useParams } from "react-router";

/* SAME ZOD SCHEMA — NO CHANGE */
const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.enum(["array", "linkedList", "graph", "dp","string","math","sorting","searching","greedy","backtracking"]),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1)
    })
  ),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1)
    })
  ),
  startCode: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript"]),
      initialCode: z.string().min(1)
    })
  ),
  referenceSolution: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript"]),
      completeCode: z.string().min(1)
    })
  )
});

function AdminUpdate() {
  const navigate = useNavigate();
  const { problemId } = useParams();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: "C++", initialCode: "" },
        { language: "Java", initialCode: "" },
        { language: "JavaScript", initialCode: "" }
      ],
      referenceSolution: [
        { language: "C++", completeCode: "" },
        { language: "Java", completeCode: "" },
        { language: "JavaScript", completeCode: "" }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: "visibleTestCases"
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: "hiddenTestCases"
  });

  /* ⭐ PREFILL CURRENT VALUES */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axiosClient.get(`/problem/problemById/${problemId}`);
        reset(data); // 👈 auto fill all fields
      } catch (err) {
        console.error(err);
      }
    };

    if (problemId) fetchProblem();
  }, [problemId, reset]);

  /* ⭐ UPDATE SUBMIT */
  const onSubmit = async (data) => {
    try {
      await axiosClient.patch(`/problem/update/${problemId}`, data);
      alert("Problem updated successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ================= BASIC INFORMATION ================= */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title")}
                className={`input input-bordered ${errors.title && "input-error"}`}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                className={`textarea textarea-bordered h-32 ${errors.description && "textarea-error"}`}
              />
            </div>

            <div className="flex gap-4">
              <select {...register("difficulty")} className="select select-bordered w-1/2">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select {...register("tags")} className="select select-bordered w-1/2">
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
                <option value="string">string</option>
                <option value="math">math</option>
                <option value="sorting">sorting</option>
                <option value="searching">searching</option>
                <option value="greedy">greedy</option>
                <option value="backtracking">backtracking</option>

              </select>
            </div>

          </div>
        </div>

        {/* ================= TEST CASES ================= */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h3>Visible Test Cases</h3>
              <button type="button" onClick={() => appendVisible({input:"",output:"",explanation:""})} className="btn btn-sm btn-primary">
                Add Visible Case
              </button>
            </div>

            {visibleFields.map((field,index)=>(
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <button type="button" onClick={()=>removeVisible(index)} className="btn btn-xs btn-error">Remove</button>

                <input {...register(`visibleTestCases.${index}.input`)} className="input input-bordered w-full"/>
                <input {...register(`visibleTestCases.${index}.output`)} className="input input-bordered w-full"/>
                <textarea {...register(`visibleTestCases.${index}.explanation`)} className="textarea textarea-bordered w-full"/>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Hidden Test Cases</h3>
              <button type="button" onClick={()=>appendHidden({input:"",output:""})} className="btn btn-sm btn-primary">
                Add Hidden Case
              </button>
            </div>

            {hiddenFields.map((field,index)=>(
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <button type="button" onClick={()=>removeHidden(index)} className="btn btn-xs btn-error">Remove</button>

                <input {...register(`hiddenTestCases.${index}.input`)} className="input input-bordered w-full"/>
                <input {...register(`hiddenTestCases.${index}.output`)} className="input input-bordered w-full"/>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CODE SECTION ================= */}
        <div className="card bg-base-100 shadow-lg p-6">
          {[0,1,2].map((index)=>(
            <div key={index} className="space-y-2">
              <h3>{index===0?"C++":index===1?"Java":"JavaScript"}</h3>

              <textarea {...register(`startCode.${index}.initialCode`)} className="textarea textarea-bordered w-full font-mono"/>
              <textarea {...register(`referenceSolution.${index}.completeCode`)} className="textarea textarea-bordered w-full font-mono"/>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Problem
        </button>

      </form>
    </div>
  );
}

export default AdminUpdate;