import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, Zap, ArrowRight, Upload, FileText, MousePointerClick, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-grow pt-5">
                <div className="relative isolate pt-14 lg:px-8">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-200 to-brand-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                    </div>

                    <div className="mx-auto max-w-3xl py-20 sm:py-28 text-center px-6">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/5 hover:ring-brand-500/20 transition-all bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md">
                                <span className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                                    New: AI Model v2.0 is live
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Tailor your resume to <br className="hidden sm:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600">any job description.</span>
                        </h1>

                        <p className="mt-8 text-lg leading-8 text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            Stop sending generic resumes. Our advanced AI analyzes job requirements and rewrites your experience to match perfectly—increasing your interview chances by <span className="font-semibold text-gray-900">3x</span>.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="group rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:shadow-brand-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                            >
                                Start Tailoring Free
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Trusted By / Social Proof (Mock) */}
                        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <p className="text-center text-xs font-semibold leading-8 text-gray-500 uppercase tracking-widest">
                                Empowering careers at
                            </p>
                            <div className="mt-4 flex justify-center gap-8 grayscale opacity-50">
                                {/* Just subtle placeholders for logos */}
                                <div className="font-bold text-xl text-gray-400">Google</div>
                                <div className="font-bold text-xl text-gray-400">Amazon</div>
                                <div className="font-bold text-xl text-gray-400">Microsoft</div>
                                <div className="font-bold text-xl text-gray-400">Meta</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Section */}
                <div id="features" className="py-24 sm:py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-50/50 -skew-y-3 origin-top-left scale-110 -z-10"></div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-brand-600">Why us?</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to land the interview
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2">

                                {[
                                    {
                                        icon: Sparkles,
                                        title: "AI-Powered Optimization",
                                        desc: "Advanced LLMs analyze job postings to identify key requirements and seamlessly integrate relevant keywords into your profile.",
                                        color: "bg-amber-500"
                                    },
                                    {
                                        icon: CheckCircle2,
                                        title: "100% ATS Friendly",
                                        desc: "We ensure your resume is parsed correctly by Applicant Tracking Systems (ATS), preventing auto-rejection before a human sees it.",
                                        color: "bg-emerald-500"
                                    },
                                    {
                                        icon: Zap,
                                        title: "Instant Results",
                                        desc: "Get a perfectly tailored resume in under 10 seconds. Focus your time on interview prep, not word-smithing bullet points.",
                                        color: "bg-blue-500"
                                    },
                                    {
                                        icon: FileText,
                                        title: "Smart Formatting",
                                        desc: "Our engine preserves your markdown structure while enhancing the content, ensuring the output is always clean and professional.",
                                        color: "bg-purple-500"
                                    }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-lg hover:-translate-y-1 lg:flex-row lg:items-start lg:gap-6">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${feature.color} mb-4 lg:mb-0`}>
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <dt className="text-lg font-semibold leading-7 text-gray-900">{feature.title}</dt>
                                            <dd className="mt-1 text-base leading-7 text-gray-600">{feature.desc}</dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* How it works section */}
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center mb-16">
                            <h2 className="text-base font-semibold leading-7 text-brand-600">Workflow</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Three steps to your dream job
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-100 via-brand-200 to-gray-100 -z-10"></div>

                            {[
                                { icon: Upload, title: "1. Upload Details", desc: "Paste your existing resume content." },
                                { icon: FileText, title: "2. Add Description", desc: "Paste the job description you want." },
                                { icon: MousePointerClick, title: "3. Tailor", desc: "One click to generate your optimized resume." }
                            ].map((step, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl shadow-brand-100 ring-4 ring-brand-50 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="h-10 w-10 text-brand-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                    <div className="relative isolate overflow-hidden bg-brand-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#7775D6" />
                                    <stop offset={1} stopColor="#E935C1" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to boost your career?
                                <br />
                                Start using AI Resume Tailorer.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Join thousands of job seekers who are landing more interviews with tailored resumes.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all transform hover:scale-105"
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
