import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    return new GoogleGenerativeAI(apiKey);
};

interface TailorRequest extends Request {
    body: {
        originalResumeText: string;
        jobDescription: string;
    }
}

export const tailorResume = async (req: TailorRequest, res: Response) => {
    try {
        const { originalResumeText, jobDescription } = req.body;

        if (!originalResumeText || !jobDescription) {
            return res.status(400).json({ error: 'Original resume text and job description are required' });
        }

        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        You are an expert resume writer and ATS optimization specialist. 
        Your task is to write a complete, professional resume based on the user's original resume and the target job description.

        Job Description:
        ${jobDescription}

        Original Resume:
        ${originalResumeText}

        Instructions:
        1. Analyze the Job Description to identify key skills, keywords, and requirements.
        2. Rewrite the Original Resume to highlight relevant experience and skills that match the Job Description.
        3. Use professional, action-oriented language.
        4. Return the output IN PURE JSON FORMAT. Do not include any Markdown formatting (no \`\`\`json or \`\`\`).
        5. The JSON must strictly follow this schema:
        {
            "personalInfo": {
                "fullName": "string",
                "email": "string",
                "phone": "string",
                "linkedin": "string (optional)",
                "portfolio": "string (optional)",
                "address": "string (optional)",
                "summary": "string (optional)"
            },
            "professionalSummary": "string",
            "skills": {
                "technical": ["string"],
                "soft": ["string"],
                "languages": ["string"]
            },
            "experience": [
                {
                    "position": "string",
                    "company": "string",
                    "location": "string (optional)",
                    "startDate": "string",
                    "endDate": "string",
                    "responsibilities": ["string"]
                }
            ],
            "education": [
                {
                    "degree": "string",
                    "school": "string",
                    "location": "string (optional)",
                    "graduationDate": "string",
                    "details": ["string"]
                }
            ],
            "projects": [
                {
                    "name": "string",
                    "description": "string",
                    "technologies": ["string"],
                    "link": "string (optional)",
                    "role": "string (optional)"
                }
            ],
            "certifications": [
                {
                    "name": "string",
                    "issuer": "string",
                    "date": "string",
                    "link": "string (optional)"
                }
            ]
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const resumeData = JSON.parse(text);

        res.status(200).json({ resumeData });





    } catch (error: any) {
        console.error("Error tailoring resume:", error);
        res.status(500).json({ error: 'Failed to tailor resume', details: error.message });
    }
};
