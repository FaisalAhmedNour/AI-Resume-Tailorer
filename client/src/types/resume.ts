export interface ResumeStructure {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        linkedin?: string;
        portfolio?: string;
        address?: string;
        summary?: string; // Short bio/objective sometimes separate from professional summary
    };
    professionalSummary: string;
    skills: {
        technical: string[];
        soft: string[];
        languages?: string[];
    };
    experience: {
        position: string;
        company: string;
        location?: string;
        startDate: string;
        endDate: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        school: string;
        location?: string;
        graduationDate: string;
        details?: string[]; // Honors, relevant coursework
    }[];
    projects?: {
        name: string;
        description: string;
        technologies: string[];
        link?: string;
        role?: string;
    }[];
    certifications?: {
        name: string;
        issuer: string;
        date: string;
        link?: string;
    }[];
}
