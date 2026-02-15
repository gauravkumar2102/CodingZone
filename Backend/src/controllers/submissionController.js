import Problem from '../models/problemSchema.js';
import { SubmitBatch, submitToken, getLanguageById } from '../utils/probelmUtils.js';
import Submission from '../models/submission.js';








// ========================================================
// ====================== SUBMIT CODE =====================
// ========================================================

export const submitCode = async (req,res)=>{
  try{
    console.log("Submit code called");

    const userId = req.result._id;
    const problemId = req.params.id;
    let {code,language} = req.body;

    code =code;

    if(!userId || !code || !problemId || !language)
      return res.status(400).send("Some field missing");

    if(language==='cpp') language='c++';

    const problem = await Problem.findById(problemId);

    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status:'pending',
      testCasesTotal:problem.hiddenTestCases.length
    });

    const languageId = getLanguageById(language);

    const submissions = problem.hiddenTestCases.map((testcase)=>({
      source_code:code,
      language_id: languageId,
      stdin: testcase.input
    }));

    const submitResult = await SubmitBatch(submissions);

    if(!submitResult){
      return res.status(500).send("Judge0 submission failed");
    }

    const resultToken = submitResult.map((value)=> value.token);
    const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;

    for(const test of testResult){

      const stdout  = test.stdout;
      const stderr  = test.stderr;
      const compile = test.compile_output;

      if(test.status_id === 3){
        testCasesPassed++;
        runtime += parseFloat(test.time || 0);
        memory = Math.max(memory, test.memory || 0);
      }
      else if(test.status_id === 6){
        status = 'error';          // Compilation Error
        errorMessage = compile;
      }
      else if(test.status_id === 7){
        status = 'error';          // Runtime Error
        errorMessage = stderr;
      }
      else{
        status = 'wrong';          // Wrong Answer / TLE / others
      }
    }

    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    if(!req.result.problemSolved.some(id=>id.toString()===problemId)){
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    const accepted = (status === 'accepted');

    return res.status(201).json({
      accepted,
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory
    });

  }
  catch(err){
    console.log(err.message);
    return res.status(500).send("Internal Server Error "+ err.message);
  }
};



// ========================================================
// ======================= RUN CODE =======================
// ========================================================

export const runCode = async(req,res)=>{
  try{

    const userId = req.result._id;
    const problemId = req.params.id;
    let {code,language} = req.body;

    code =code;

    if(!userId || !code || !problemId || !language)
      return res.status(400).send("Some field missing");

    if(language==='cpp') language='c++';

    const problem = await Problem.findById(problemId);
    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testcase)=>({
      source_code:code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output

    }));

    const submitResult = await SubmitBatch(submissions);

    if(!submitResult){
      return res.status(500).send("Judge0 submission failed");
    }

    const resultToken = submitResult.map((value)=> value.token);
    const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let success = true;
    let errorMessage = null;

    for(const test of testResult){

      const stdout  = test.stdout;
      const stderr  = test.stderr;
      const compile = test.compile_output;
 
      if(test.status_id === 3){
        testCasesPassed++;
        runtime += parseFloat(test.time || 0);
        memory = Math.max(memory, test.memory || 0);
      } 
      else if(test.status_id === 6){
        success = false;
        errorMessage = compile;
      }
      else if(test.status_id === 7){
        success = false;
        errorMessage = stderr;
      }
      else{
        success = false;
      }
    }

    console.log("Test Result", testResult);

    return res.status(201).json({
      success,
      testCases: testResult.map(t=>({
        ...t,
        stdout:t.stdout,
        stderr: t.stderr,
        compile_output: t.compile_output
      })),
      runtime,
      memory,
      errorMessage
    });

  }
  catch(err){
    console.log(err.message);
    return res.status(500).send("Internal Server Error "+ err.message);
  }
};