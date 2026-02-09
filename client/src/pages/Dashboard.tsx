import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { Loader2, Copy, FileText, Briefcase, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleTailor = async () => {
        if (!resumeText.trim() || !jobDescription.trim()) {
            toast.error('Please enter both resume text and job description.');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:5000/api/resume/tailor', {
                originalResumeText: resumeText,
                jobDescription: jobDescription,
            });

            setResult(response.data);
            toast.success('Resume tailored successfully!');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Failed to tailor resume. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    // Helper to standardise result display since we get JSON
    const renderResult = (): string => {
        if (!result) return '';

        // Convert JSON back to a readable markdown-like format for display
        const mdContent = `
## Summary
${result.summary}

## Experience
${result.experience.map((exp: any) => `
### ${exp.role} at ${exp.company}
${exp.points.map((point: string) => `- ${point}`).join('\n')}
`).join('\n')}

## Skills
${result.skills.join(', ')}
    `;

        return mdContent;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navbar (Simplified) */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">AI Resume Tailorer</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Original Resume</h2>
                            </div>
                            <textarea
                                className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Paste your current resume text here..."
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                                <h2 className="text-lg font-medium text-gray-900">Job Description</h2>
                            </div>
                            <textarea
                                className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Paste the job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleTailor}
                            disabled={loading}
                            className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Tailoring Resume...
                                </>
                            ) : (
                                'Tailor My Resume'
                            )}
                        </button>
                    </div>

                    {/* Output Section */}
                    <div className="bg-white shadow rounded-lg p-6 flex flex-col h-full min-h-[600px]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Tailored Resume</h2>
                            {result && (
                                <button
                                    onClick={() => copyToClipboard(renderResult() || '')}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy Markdown
                                </button>
                            )}
                        </div>

                        <div className="flex-grow p-4 border border-gray-200 rounded-md bg-gray-50 overflow-auto prose prose-blue max-w-none">
                            {result ? (
                                <ReactMarkdown>{renderResult() || ''}</ReactMarkdown>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Sparkles className="h-12 w-12 mb-2" />
                                    <p>Your tailored resume will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
