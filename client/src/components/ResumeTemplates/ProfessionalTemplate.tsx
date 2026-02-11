import React from 'react';
import { ResumeStructure } from '../../types/resume';

interface TemplateProps {
    data: ResumeStructure;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 h-full p-10 font-serif">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.address && <span>• {data.personalInfo.address}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.portfolio && <span>• {data.personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.professionalSummary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-justify">{data.professionalSummary}</p>
                </section>
            )}

            {/* Experience */}
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Professional Experience</h2>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{exp.company}</span>
                                <span>{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <div className="flex justify-between text-sm italic text-gray-700 mb-1">
                                <span>{exp.position}</span>
                                <span>{exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-1 mt-1">
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i} className="text-sm">{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Education</h2>
                <div className="space-y-2">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{edu.school}</span>
                                <span>{edu.graduationDate}</span>
                            </div>
                            <div className="flex justify-between text-sm italic text-gray-700">
                                <span>{edu.degree}</span>
                                <span>{edu.location}</span>
                            </div>
                            {edu.details && (
                                <p className="text-xs text-gray-600 mt-0.5">{edu.details.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Skills</h2>
                <div className="text-sm">
                    <div className="mb-1">
                        <span className="font-bold">Technical: </span>
                        <span>{data.skills.technical.join(', ')}</span>
                    </div>
                    <div>
                        <span className="font-bold">Soft Skills: </span>
                        <span>{data.skills.soft.join(', ')}</span>
                    </div>
                </div>
            </section>

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Key Projects</h2>
                    <div className="space-y-3">
                        {data.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-sm text-gray-900">{project.name}</h3>
                                    {project.link && <a href={project.link} className="text-xs text-blue-800 underline">Link</a>}
                                </div>
                                <p className="text-sm">{project.description}</p>
                                <p className="text-xs italic text-gray-600 mt-1">Tech: {project.technologies.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
};

export default ProfessionalTemplate;
