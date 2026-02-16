import axios from "axios";

export const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    "java": 62,
    "javascript": 63,
  };

  return language[lang.toLowerCase()];
};


// ================= BASE64 ENCODE/DECODE FUNCTIONS =================
const btoa = (str) => {
  if (!str) return Buffer.from("").toString('base64');
  
 
  const normalized = str
    .replace(/\r\n/g, '\n')  
    .replace(/\r/g, '\n');  
  
  return Buffer.from(normalized).toString('base64');
};

const atob = (b64) => {
  if (!b64) return null;
  try {
    return Buffer.from(b64, 'base64').toString('utf-8');
  } catch (error) {
    console.error("Base64 decode error:", error);
    return null;
  }
};


// ================= WAIT FUNCTION =================
const waiting = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



// ================= SUBMIT BATCH =================
export const SubmitBatch = async (submissions) => {

  // Encode all text fields to base64
  const encodedSubmissions = submissions.map(sub => ({
    source_code: btoa(sub.source_code),
    language_id: sub.language_id,
    stdin: btoa(sub.stdin || ""),
    expected_output: btoa(sub.expected_output || "")
  }));

  const options = {
    method: "POST",
    url: "https://judge029.p.rapidapi.com/submissions/batch",
    timeout: 15000,
    params: { base64_encoded: "true" },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "judge029.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: { submissions: encodedSubmissions },
  };

  try {
    const response = await axios.request(options);

    if (!response.data) {
      throw new Error("Empty Judge0 response");
    }

    return response.data;

  } catch (error) {
    console.error("Judge0 Submit Error:", error.response?.data || error.message);
    return null;
  }
};




// ================= GET RESULT USING TOKENS =================
export const submitToken = async (tokens) => {

  if (!tokens || tokens.length === 0) {
    throw new Error("No tokens provided to submitToken()");
  }

  const options = {
    method: "GET",
    url: "https://judge029.p.rapidapi.com/submissions/batch",
    timeout: 15000,
    params: {
      tokens: tokens.join(","),
      base64_encoded: "true",  // Judge0 returns base64
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "judge029.p.rapidapi.com",
    },
  };

  let attempts = 0;
  const MAX_ATTEMPTS = 15;  

  while (attempts < MAX_ATTEMPTS) {

    try {
      const response = await axios.request(options);
      const result = response.data;

      if (!result || !result.submissions) {
        throw new Error("Invalid Judge0 response");
      }

      const isResultObtained = result.submissions.every(
        (r) => r.status_id > 2
      );

      if (isResultObtained) {
        // Decode ALL base64 fields to readable strings
        const decodedSubmissions = result.submissions.map(sub => ({
          ...sub,
          stdout: sub.stdout ? atob(sub.stdout) : null,
          stderr: sub.stderr ? atob(sub.stderr) : null,
          compile_output: sub.compile_output ? atob(sub.compile_output) : null,
          message: sub.message ? atob(sub.message) : null,
          stdin: sub.stdin ? atob(sub.stdin) : null,
          expected_output: sub.expected_output ? atob(sub.expected_output) : null,
        }));
        return decodedSubmissions;
      }

    } catch (error) {
      console.error("Judge0 Fetch Error:", error.response?.data || error.message);
    }

    attempts++;
    await waiting(1000);
  }

  throw new Error("Judge0 polling timeout");
};