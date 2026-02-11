import React from 'react';
import { ResumeStructure } from '../../types/resume';

interface TemplateProps {
    data: ResumeStructure;
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div className="bg-white text-gray-900 h-full p-12 font-sans">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-5xl font-light text-gray-900 mb-4">{data.personalInfo.fullName}</h1>
                <div className="text-sm text-gray-500 font-light flex flex-col gap-1">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
                    {data.personalInfo.linkedin && (
                        <a href={`https://${data.personalInfo.linkedin}`} className="text-gray-900 hover:text-black hover:underline" target="_blank" rel="noreferrer">
                            linkedin.com/in/{data.personalInfo.linkedin.replace(/.*linkedin.com\/in\//, '')}
                        </a>
                    )}
                    {data.personalInfo.portfolio && (
                        <a href={data.personalInfo.portfolio} className="text-gray-900 hover:text-black hover:underline" target="_blank" rel="noreferrer">
                            Portfolio
                        </a>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left Column (Skills & Education) */}
                <aside className="md:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="font-medium text-sm">{edu.school}</div>
                                    <div className="text-xs text-gray-500">{edu.degree}</div>
                                    <div className="text-xs text-gray-400 mt-1">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
                        <div className="flex flex-col gap-2">
                            <div>
                                <h3 className="text-xs font-semibold text-gray-600 mb-1">Technical</h3>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                    {data.skills.technical.join(', ')}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-gray-600 mb-1">Languages</h3>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                    {data.skills.languages?.join(', ')}
                                </div>
                            </div>
                        </div>
                    </section>
                </aside>

                {/* Right Column (Experience & Summary) */}
                <main className="md:col-span-3 space-y-10">
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">About</h2>
                            <p className="text-sm leading-7 text-gray-700">{data.professionalSummary}</p>
                        </section>
                    )}

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-medium text-lg text-gray-900">{exp.position}</h3>
                                        <span className="text-xs text-gray-400">{exp.startDate} — {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-3">{exp.company}</div>
                                    <ul className="list-none space-y-2">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="text-sm text-gray-700 leading-relaxed pl-0">{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Projects</h2>
                            <div className="space-y-6">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-medium text-md text-gray-900">{project.name}</h3>
                                            {project.link && <a href={project.link} className="text-xs text-gray-400 hover:text-black">View Project →</a>}
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MinimalistTemplate;
