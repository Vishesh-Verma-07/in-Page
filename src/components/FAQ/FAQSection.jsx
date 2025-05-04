import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../components/ui/Accordian";
  import styles from "./FAQSection.module.css";
  
  const FAQSection = () => {
    const faqs = [
      {
        question: "Who can apply for the internships?",
        answer:
          "Our internships are open to current undergraduate and graduate students, as well as recent graduates within one year of graduation. We welcome applicants from all academic backgrounds, though some positions may require specific technical skills or coursework.",
      },
      {
        question: "Are these internships paid or unpaid?",
        answer:
          "Yes, all our internships are paid positions. The exact compensation depends on the specific role, location, and your experience level. Details about compensation will be discussed during the interview process.",
      },
      {
        question: "What is the duration of the internships?",
        answer:
          "Our internships typically range from 3 to 6 months, depending on the department and project needs. Some positions may offer the possibility of extension or conversion to full-time roles for exceptional performers.",
      },
      {
        question: "What skills are required?",
        answer:
          "The required skills vary by position. Technical roles may require specific programming languages or tools, while marketing or business roles might focus more on communication and analytical abilities. Each internship posting includes the specific requirements for that role.",
      },
      {
        question: "What will the intern be doing during the program?",
        answer:
          "Our interns work on real projects with meaningful impact. You'll be paired with a mentor and integrated into a team where you'll contribute to ongoing work, participate in meetings, and present your accomplishments. We focus on providing a valuable learning experience with practical, hands-on work.",
      },
      {
        question: "Is remote work available for all positions?",
        answer:
          "Some positions are fully remote, others are on-site, and some offer a hybrid approach. The location requirements are specified in each internship description. We try to be flexible where possible, but some roles do require physical presence.",
      },
      {
        question: "What is the application process like?",
        answer:
          "After submitting your application, our team will review your materials. If selected, you'll typically go through 1-3 interviews, which may include technical assessments for certain roles. The entire process usually takes 2-3 weeks from application to decision.",
      },
      {
        question: "Can I apply for multiple internships?",
        answer:
          "Yes, you can apply for multiple positions that match your skills and interests. In the application form, you can select all the internships you're interested in.",
      },
    ];
  
    return (
      <section id="faq" className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
  
          <Accordion type="single" collapsible className={styles.accordion}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={styles.accordionItem}
              >
                <AccordionTrigger className={styles.accordionTrigger}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={styles.accordionContent}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default FAQSection;
  