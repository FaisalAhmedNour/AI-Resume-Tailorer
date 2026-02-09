import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import { Loader2, Copy, FileText, Briefcase, Sparkles, ChevronRight, Wand2, Eraser, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const resumeRef = useRef<HTMLDivElement>(null);

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

            // Expecting { resumeMarkdown: string }
            setResult(response.data.resumeMarkdown);
            toast.success('Resume tailored successfully!');
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Failed to tailor resume. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            toast.success('Markdown copied to clipboard!');
        }
    };

    const handleDownloadPdf = useReactToPrint({
        content: () => resumeRef.current,
        documentTitle: 'Tailored_Resume',
        onAfterPrint: () => toast.success('PDF Downloaded!')
    });

    const clearInputs = () => {
        setResumeText('');
        setJobDescription('');
        setResult(null);
        toast.success('Cleared all inputs');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

            <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-12">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/60 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="mt-1 text-gray-500">Tailor your resume for specific job applications in seconds.</p>
                    </div>
                    <button
                        onClick={clearInputs}
                        className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-600 bg-white hover:bg-gray-50 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <Eraser className="h-4 w-4 mr-2" />
                        Clear All
                    </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">
                    {/* Input Section */}
                    <div className="xl:col-span-5 flex flex-col gap-6">

                        {/* Resume Input */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-200/75 rounded-2xl overflow-hidden flex flex-col h-[350px] transition-shadow hover:shadow-md">
                            <div className="border-b border-gray-100 bg-gray-50/30 px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-indigo-100 p-1.5 rounded-lg">
                                        <FileText className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Original Resume</span>
                                </div>
                            </div>
                            <textarea
                                className="flex-1 w-full p-5 border-0 focus:ring-0 text-sm leading-relaxed resize-none text-gray-700 placeholder-gray-400 font-mono bg-transparent"
                                placeholder="Paste your full resume content here..."
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />
                        </div>

                        {/* Job Desc Input */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-200/75 rounded-2xl overflow-hidden flex flex-col h-[350px] transition-shadow hover:shadow-md">
                            <div className="border-b border-gray-100 bg-gray-50/30 px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-emerald-100 p-1.5 rounded-lg">
                                        <Briefcase className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Job Description</span>
                                </div>
                            </div>
                            <textarea
                                className="flex-1 w-full p-5 border-0 focus:ring-0 text-sm leading-relaxed resize-none text-gray-700 placeholder-gray-400 font-mono bg-transparent"
                                placeholder="Paste the job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleTailor}
                            disabled={loading || !resumeText || !jobDescription}
                            className={`w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-semibold rounded-2xl text-white shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] ${loading
                                ? 'bg-brand-400 cursor-not-allowed'
                                : (!resumeText || !jobDescription)
                                    ? 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none'
                                    : 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 ring-4 ring-transparent hover:ring-brand-100'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Optimizing Profile...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-5 w-5" />
                                    Tailor My Resume
                                </>
                            )}
                        </button>
                    </div>

                    {/* Arrow for visual flow on desktop */}
                    <div className="hidden xl:flex xl:col-span-1 items-center justify-center">
                        <div className="text-gray-300 animate-pulse-slow">
                            <ChevronRight className="h-8 w-8" />
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="xl:col-span-6 h-full min-h-[500px] flex flex-col">
                        <div className={`bg-white shadow-xl ring-1 ring-gray-200/75 rounded-2xl overflow-hidden flex flex-col h-full border border-gray-100 relative transition-all duration-500 ${result ? 'shadow-brand-500/10 ring-brand-100' : ''}`}>
                            {/* Header */}
                            <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-gradient-to-br from-brand-500 to-accent-600 p-1.5 rounded-lg shadow-sm">
                                        <Sparkles className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">Tailored Result</span>
                                </div>
                                {result && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="inline-flex items-center px-3.5 py-1.5 border border-gray-200 shadow-sm text-xs font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                                        >
                                            <Copy className="h-3.5 w-3.5 mr-1.5" />
                                            Copy Text
                                        </button>
                                        <button
                                            onClick={handleDownloadPdf}
                                            className="inline-flex items-center px-3.5 py-1.5 border border-transparent shadow-sm text-xs font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                                        >
                                            <Download className="h-3.5 w-3.5 mr-1.5" />
                                            Download PDF
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto bg-gray-100/50 relative scroll-smooth p-6">
                                {result ? (
                                    <div className="flex justify-center">
                                        <div
                                            ref={resumeRef}
                                            className="bg-white shadow-sm p-[40px] max-w-[210mm] w-full min-h-[297mm] mx-auto text-sm"
                                            style={{ pageBreakAfter: 'always' }}
                                        >
                                            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:border-b prose-h1:pb-2 prose-h1:mb-4 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-p:text-gray-700 prose-li:text-gray-700 prose-li:marker:text-gray-500">
                                                <ReactMarkdown>{result}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                                        <div className="bg-white p-6 rounded-full shadow-lg ring-1 ring-gray-100 mb-6 animate-pulse-slow">
                                            <Sparkles className="h-10 w-10 text-brand-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to optimize</h3>
                                        <p className="max-w-xs mx-auto text-base text-gray-500 leading-relaxed">
                                            Paste your resume and the job description, then click "Tailor My Resume" to let our AI do the work.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
