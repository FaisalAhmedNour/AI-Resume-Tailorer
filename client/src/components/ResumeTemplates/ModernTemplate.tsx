import React from 'react';
import { ResumeStructure } from '../../types/resume';
import { Phone, Mail, MapPin, Linkedin, Link as LinkIcon, Globe } from 'lucide-react';

interface TemplateProps {
    data: ResumeStructure;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
    return (
        <div className="bg-white text-gray-800 h-full">
            {/* Header */}
            <header className="bg-slate-900 text-white p-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300 mt-4">
                    {data.personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{data.personalInfo.email}</span>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{data.personalInfo.phone}</span>
                        </div>
                    )}
                    {data.personalInfo.address && (
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{data.personalInfo.address}</span>
                        </div>
                    )}
                    {data.personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin size={14} />
                            <span>{data.personalInfo.linkedin}</span>
                        </div>
                    )}
                    {data.personalInfo.portfolio && (
                        <div className="flex items-center gap-1">
                            <Globe size={14} />
                            <span>{data.personalInfo.portfolio}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-col md:flex-row h-full">
                {/* Left Column (Main Content) */}
                <main className="flex-1 p-8 space-y-8">
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 uppercase">Profile</h2>
                            <p className="text-sm leading-relaxed">{data.professionalSummary}</p>
                        </section>
                    )}

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 uppercase">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-brand-600 font-medium mb-2">{exp.company} {exp.location && `| ${exp.location}`}</div>
                                    <ul className="list-disc list-outside ml-4 space-y-1">
                                        {exp.responsibilities.map((resp, i) => (
                                            <li key={i} className="text-sm text-gray-700">{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.projects && data.projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 uppercase">Projects</h2>
                            <div className="space-y-4">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md text-slate-800">{project.name}</h3>
                                            {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-brand-600 flex items-center gap-1"><LinkIcon size={10} /> Link</a>}
                                        </div>
                                        <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Right Column (Sidebar) */}
                <aside className="w-full md:w-1/3 bg-slate-50 p-8 border-l border-slate-200 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Skills</h2>
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase">Technical</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.technical.map((skill, index) => (
                                    <span key={index} className="bg-white border border-slate-200 text-slate-700 px-2 py-1 text-xs rounded shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.soft.map((skill, index) => (
                                    <span key={index} className="bg-white border border-slate-200 text-slate-700 px-2 py-1 text-xs rounded shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-slate-800 text-sm">{edu.school}</h3>
                                    <p className="text-sm text-slate-900">{edu.degree}</p>
                                    <p className="text-xs text-slate-500 mt-1">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Certifications</h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-800 text-sm">{cert.name}</h3>
                                        <p className="text-xs text-slate-600">{cert.issuer}</p>
                                        <p className="text-xs text-slate-500">{cert.date}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default ModernTemplate;
