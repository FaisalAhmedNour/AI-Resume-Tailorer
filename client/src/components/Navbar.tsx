import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Github, Wand2 } from 'lucide-react';

const Navbar: React.FC = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-xl text-white shadow-lg shadow-brand-500/20 relative">
                                <FileText className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            AI Resume <span className="text-brand-600">Tailorer</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-brand-600 transition-colors hidden sm:block font-medium"
                        >
                            <Github className="h-5 w-5" />
                        </a>

                        {!isDashboard && (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 shadow-lg hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5"
                            >
                                <Wand2 className="h-4 w-4 mr-2" />
                                Get Started
                            </Link>
                        )}

                        {isDashboard && (
                            <Link
                                to="/"
                                className="text-sm font-semibold text-gray-500 hover:text-brand-600 transition-colors"
                            >
                                Back to Home
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
