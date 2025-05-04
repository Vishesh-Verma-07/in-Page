import { useState } from "react";
// import InternshipCard from "./InternshipCard";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";

// Sample internship data
export const INTERNSHIPS = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        department: "Web Development",
        duration: "3 months",
        location: "Remote",
        deadline: "2025-05-15",
        description: "Join our development team to build responsive user interfaces using React and TypeScript. You'll gain practical experience with modern frontend technologies and collaborate with senior developers."
    },
    {
        id: 2,
        title: "Marketing Assistant",
        department: "Digital Marketing",
        duration: "6 months",
        location: "On-site",
        deadline: "2025-05-10",
        description: "Support our marketing team in creating campaigns, analyzing market trends, and developing content for social media. Learn practical marketing strategies in a fast-paced environment."
    },
    {
        id: 3,
        title: "Data Analyst Intern",
        department: "Data Science",
        duration: "4 months",
        location: "Hybrid",
        deadline: "2025-05-30",
        description: "Work with large datasets to extract insights using Python, SQL, and visualization tools. You'll help our team make data-driven decisions and improve business processes."
    },
    {
        id: 4,
        title: "UX/UI Design Intern",
        department: "Design",
        duration: "3 months",
        location: "Remote",
        deadline: "2025-06-05",
        description: "Create user-centered designs for websites and applications. You'll participate in the entire design process from research and wireframing to prototyping and testing."
    },
    {
        id: 5,
        title: "Business Development Intern",
        department: "Sales",
        duration: "6 months",
        location: "On-site",
        deadline: "2025-06-15",
        description: "Assist in identifying business opportunities, market research, and partnership development. You'll learn practical skills in client relationship management and sales strategies."
    },
    {
        id: 6,
        title: "Content Writer Intern",
        department: "Content Creation",
        duration: "4 months",
        location: "Remote",
        deadline: "2025-05-08",
        description: "Create engaging content for blogs, social media, and marketing materials. You'll develop your writing skills while learning about SEO and content strategy."
    }
];

const InternshipList = ({ onApplyClick }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter internships based on search term
    const filteredInternships = INTERNSHIPS.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section
            id="internships"
            style={{
                padding: "4rem 0",
                backgroundColor: "#f9fafb"
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
                <h2
                    style={{
                        fontSize: "1.875rem",
                        fontWeight: "bold",
                        marginBottom: "2rem",
                        textAlign: "center"
                    }}
                >
                    Available Internships
                </h2>

                <div
                    style={{
                        position: "relative",
                        marginBottom: "2rem",
                        maxWidth: "28rem",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: "0 0 auto auto",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "0.75rem",
                            pointerEvents: "none"
                        }}
                    >
                        <Search style={{ height: "1.25rem", width: "1.25rem", color: "#6b7280" }} />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search by title, department or keywords..."
                        style={{
                            paddingLeft: "2.5rem",
                            paddingTop: "1.5rem",
                            paddingBottom: "1.5rem",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.375rem"
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredInternships.length > 0 ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "1.5rem"
                        }}
                    >
                        {/* {filteredInternships.map((internship) => (
                            // <InternshipCard
                            //     key={internship.id}
                            //     {...internship}
                            //     handleApplyClick={onApplyClick}
                            // />
                        ))} */}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                        <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
                            No internships match your search criteria.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InternshipList;
