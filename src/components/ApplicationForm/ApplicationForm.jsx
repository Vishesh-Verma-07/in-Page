import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { INTERNSHIPS } from "./InternshipList";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/input";
import styles from "./ApplicationForm.module.css";
import { Textarea } from "../ui/TextArea";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  university: z.string().min(2, "Please enter your university/college name"),
  program: z.string().min(2, "Please enter your program/course"),
  yearOfStudy: z.enum(["1", "2", "3", "4", "5+"]),
  internships: z
    .array(z.number())
    .min(1, "Please select at least one internship"),
  linkedinUrl: z.string().url("Please enter a valid URL").or(z.literal("")),
  portfolioUrl: z.string().url("Please enter a valid URL").or(z.literal("")),
  resume: z
    .instanceof(File)
    .refine(
      (file) => file?.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    )
    .refine(
      (file) => file?.type === "application/pdf",
      "Only PDF files are accepted"
    ),
  motivation: z
    .string()
    .min(50, "Please write at least 50 words")
    .max(300, "Please write at most 300 words"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

const ApplicationForm = ({ selectedInternshipId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      program: "",
      yearOfStudy: "1",
      internships: selectedInternshipId ? [selectedInternshipId] : [],
      linkedinUrl: "",
      portfolioUrl: "",
      motivation: "",
      consent: undefined,
    },
    mode: "onBlur",
  });

  useState(() => {
    if (selectedInternshipId) {
      form.setValue("internships", [selectedInternshipId]);
    }
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setProgress(progressVal);

      if (progressVal >= 100) {
        clearInterval(interval);
        setIsSubmitting(false);
        form.reset();
        setSelectedFile(null);
        setProgress(0);
      }
    }, 300);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("resume", file);
    }
  };

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5+", label: "5th Year or Above" },
  ];

  return (
    <section
      id="apply"
      style={{
        padding: "2rem",
        background: "linear-gradient(to bottom, #f8f9fa,rgb(230, 237, 255))",
      }}
    >
      <div style={{ maxWidth: "768px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Apply for Internships
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6c757d",
            marginBottom: "2rem",
          }}
        >
          Fill out the form below to apply for your selected internship
          opportunity
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: "0.5rem",
            boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
            padding: "1.5rem",
            border: "1px solid #dee2e6",
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Personal Information */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  Personal Information
                </h3>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Education Information */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                  Education
                </h3>

                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College/University</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your college or university name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program/Course</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "0.25rem",
                            border: "1px solid #ced4da",
                            padding: "0.5rem",
                            fontSize: "0.9rem",
                          }}
                          {...field}
                        >
                          {yearOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional sections */}
              {/* Add similar inline styles for other sections */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                  Internship Selection
                </h3>

                <FormField
                  control={form.control}
                  name="internships"
                  render={() => (
                    <FormItem>
                      <div style={{ marginBottom: "1rem" }}>
                        <FormLabel>Select Internship(s)</FormLabel>
                        <FormDescription>
                          Choose one or more internships you want to apply for
                        </FormDescription>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        {INTERNSHIPS.map((internship) => (
                          <FormField
                            key={internship.id}
                            control={form.control}
                            name="internships"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={internship.id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value?.includes(
                                        internship.id
                                      )}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              internship.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== internship.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    style={{
                                      fontSize: "0.875rem",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {internship.title}
                                    <span
                                      style={{
                                        marginLeft: "0.5rem",
                                        fontSize: "0.75rem",
                                        border: "1px solid #ced4da",
                                        borderRadius: "1rem",
                                        padding: "0.25rem",
                                        paddingLeft: "0.5rem",
                                        paddingRight: "0.5rem",
                                      }}
                                    >
                                      {internship.department}
                                    </span>
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                  Additional Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          LinkedIn Profile URL{" "}
                          <span style={{ color: "#6c757d" }}>(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/yourprofile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Portfolio/Project URL{" "}
                          <span style={{ color: "#6c757d" }}>(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourportfolio.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Resume Upload{" "}
                        <span style={{ color: "#6c757d" }}>
                          (PDF only, max 2MB)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      {selectedFile && (
                        <p style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Why do you want this internship?{" "}
                        <span style={{ color: "#6c757d" }}>(50-300 words)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're interested in this internship and what you hope to achieve..."
                          style={{
                            minHeight: "120px",
                            width: "100%",
                            border: "1px solid #ced4da",
                            borderRadius: "12px",
                            padding: "0.5rem",
                            fontSize: "1rem",
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        style={{ fontSize: "0.875rem", color: "#6c757d" }}
                      >
                        Word count:{" "}
                        {field.value.trim().split(/\s+/).filter(Boolean).length}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        style={{
                          width: "1rem",
                          height: "1rem",
                          cursor: "pointer",
                        }}
                      />
                    </FormControl>
                    <div
                      style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
                    >
                      <FormLabel style={{ fontWeight: "500" }}>
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription style={{ color: "#6c757d" }}>
                        By checking this box, you agree that we may contact you
                        regarding your application.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {isSubmitting && (
                <div className="space-y-2">
                  {/* <Progress value={progress} className="w-full" /> */}
                  <p className="text-sm text-center text-muted-foreground">
                    Submitting your application...
                  </p>
                </div>
              )}

              {/* <button
                type="submit"
                style={{
                    width: "100%",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "background-color 0.3s ease",
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>} */}
              <button className={styles.button} onClick={() => {}}>
                Submit Application
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
