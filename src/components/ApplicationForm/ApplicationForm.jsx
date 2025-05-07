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
import { AuthService } from "../../axios/user";
import { Progress } from "../ui/progress";


const apiClass = new AuthService();

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
    handleForm(data);
  };

  const handleForm = async (data) => {
    try {
      const response = await apiClass.internshipFormSubmit(data);
      console.log("Form submitted successfully:", response.data);
      if (response.status === 201) {
        // notifySuccess("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      // notifyError("Try again later");
    }
  }

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
      className={styles.section}
    >
      <div className={styles.header}>
        <h2
          className={styles.heading}
        >
          Apply for Internships
        </h2>
        <p
          className={styles.text}
        >
          Fill out the form below to apply for your selected internship
          opportunity
        </p>

        <div
          className={styles.container2}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={styles.form}
            >
              {/* Personal Information */}
              <div
                className={styles.section2}
              >
                <h3 className={styles
                  .sectionTitle
                }>
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
                className={styles.gridTwoCols}
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
                 className={styles.education}
              >
                <h3 className={styles.educationText}>
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
            className={styles.program}
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
                         className={styles.select}
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
              <div className={styles.internshipGroup}>
                <h3 className={styles.educationText
                }>
                  Internship Selection
                </h3>

                <FormField
                  control={form.control}
                  name="internships"
                  render={() => (
                    <FormItem>
                      <div className={styles.selectIn}>
                        <FormLabel>Select Internship(s)</FormLabel>
                        <FormDescription>
                          Choose one or more internships you want to apply for
                        </FormDescription>
                      </div>
                      <div
                       className={styles.internshipWrap}
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
                                  
                                  className ={styles.selectIntern}
                              
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
                                  className = {styles.internshipLabel}
                                  >
                                    {internship.title}
                                    <span
                                     className={styles.internshipTag}
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
              className={styles.additionalSection}
              >
                <h3 className={styles.educationText}>
                  Additional Information
                </h3>

                <div
               className={styles.gridTwoCols}
                >
                  <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          LinkedIn Profile URL{" "}
                          <span className={styles.optionalText}>(Optional)</span>
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
                          <span className={styles.optionalText}>(Optional)</span>
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
                        <span className={styles.optionalText}>
                          (PDF only, max 2MB)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div
                         className={styles.fileInputWrap}
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
                        <p  className={styles.selectedFile}>
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
                        <span className={styles.optionalText}>(50-300 words)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're interested in this internship and what you hope to achieve..."

                          style={{
                            minHeight: "120px",
                            border: "1px solid #ced4da",
                           width: "100%",
                             borderRadius: "12px",
                            padding: "0.5rem",
                            fontSize: "1rem",
                          }}

                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className = {styles.wordCount}
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
                  className = { styles.checkboxRow}
                  >
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                         className={styles.checkboxInput}
                      />
                    </FormControl>
                    <div

                     className={styles.checkboxText }
                    >
                      <FormLabel className = { styles.checkboxLabel}>
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormDescription className = {styles.checkboxDescription}>
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
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    Submitting your application...
                  </p>
                </div>
              )}

              <button className={styles.button} onClick={() => { }}>
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
