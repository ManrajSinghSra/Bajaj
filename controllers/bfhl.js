const { generateFibonacci, filterPrimes, calculateLCM, calculateHCF } = require("../math/math");

const OFFICIAL_EMAIL = "manraj1323.be23@chitkarauniversity.edu.in";
 

async function getAIResponse(question) {
  console.log("AI Step 1: Function started");

  const GEMINI_API_KEY = "AIzaSyCd3vbITH4raJV03VbPRs7IFa2ODkqGHVk";
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing in .env");
  }

  if (typeof fetch === "undefined") {
    throw new Error("fetch not available. Use Node 18+ or install node-fetch.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Answer in exactly one word: ${question}`
          }]
        }]
      })
    }
  );

  console.log("AI Step 2: Status", response.status);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("Gemini API error: " + errText);
  }

  const data = await response.json();

  if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error("Invalid Gemini response structure");
  }

  const raw = data.candidates[0].content.parts[0].text.trim();
  return raw.split(/\s+/)[0].replace(/[^a-zA-Z]/g, "");
}

 
 const bfhl= async (req, res) => {
  try {
    console.log("Route entered");

    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        is_success: false,
        error: "Invalid or missing JSON body"
      });
    }

    const body = req.body;
    const validKeys = ["fibonacci", "prime", "lcm", "hcf", "AI"];
    const requestKeys = Object.keys(body);

    if (requestKeys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one operation key required"
      });
    }

    const operationKey = requestKeys[0];

    if (!validKeys.includes(operationKey)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid operation key"
      });
    }

    const value = body[operationKey];
    let data;

    switch (operationKey) {
      case "fibonacci":
        if (!Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            error: "Fibonacci requires non-negative integer"
          });
        }
        data = generateFibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value) || !value.every(Number.isInteger)) {
          return res.status(400).json({
            is_success: false,
            error: "Prime requires array of integers"
          });
        }
        data = filterPrimes(value);
        break;

      case "lcm":
        if (!Array.isArray(value) || !value.every(Number.isInteger)) {
          return res.status(400).json({
            is_success: false,
            error: "LCM requires array of integers"
          });
        }
        data = calculateLCM(value);
        break;

      case "hcf":
        if (!Array.isArray(value) || !value.every(Number.isInteger)) {
          return res.status(400).json({
            is_success: false,
            error: "HCF requires array of integers"
          });
        }
        data = calculateHCF(value);
        break;

      case "AI":
        if (typeof value !== "string" || value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            error: "AI requires non-empty string"
          });
        }
        data = await getAIResponse(value);
        break;
    }

    if (res.headersSent) {
      console.log("Headers already sent");
      return;
    }

    console.log("Sending success response");

    console.log(data);
    

    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });

  } catch (error) {
    console.error("FULL SERVER ERROR:", error);
    return res.status(500).json({
      is_success: false,
      error: error.message
    });
  }
}

module.exports={bfhl}
