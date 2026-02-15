import axios from "axios";

export const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    "java": 62,
    "javascript": 63,
  };

  return language[lang.toLowerCase()];
};


// ================= WAIT FUNCTION =================
const waiting = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};



// ================= SUBMIT BATCH =================
export const SubmitBatch = async (submissions) => {

  const options = {
    method: "POST",
    url: "https://judge029.p.rapidapi.com/submissions/batch",
    timeout: 15000,
    params: { base64_encoded: "false" },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "judge029.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: { submissions },
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
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "judge029.p.rapidapi.com",
    },
  };

  let attempts = 0;
  const MAX_ATTEMPTS =15;  

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
        return result.submissions;
      }

    } catch (error) {
      console.error("Judge0 Fetch Error:", error.response?.data || error.message);
    }

    attempts++;
    await waiting(1000);
  }

  throw new Error("Judge0 polling timeout");
};