import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                    © {new Date().getFullYear()} AI Resume Tailorer. All rights reserved.
                </div>

                <div className="flex items-center text-sm text-gray-500">
                    <span>Made with</span>
                    <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" />
                    <span>by Faisal Ahmed</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
