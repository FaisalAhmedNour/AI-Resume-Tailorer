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
        4. Structure the resume clearly with the following sections (mapped to standard Markdown headers):
           - # [Candidate Name] (Use "Candidate Name" if not found)
           - ## Professional Summary
           - ## Experience (Focus on achievements and metrics)
           - ## Skills (Technical and Soft skills relevant to the job)
           - ## Education
           - ## Projects (if applicable)
        5. The output MUST be a single, well-formatted Markdown string. 
        6. Do NOT include any explanations, preambles, or JSON formatting. Just the raw Markdown content.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ resumeMarkdown: text });





    } catch (error: any) {
        console.error("Error tailoring resume:", error);
        res.status(500).json({ error: 'Failed to tailor resume', details: error.message });
    }
};
