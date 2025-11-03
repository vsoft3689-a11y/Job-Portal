import React, { useState } from "react";
import "../App.css";

export default function HelpPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account on JobHire Portal?",
      answer:
        "To create an account, click on the 'Sign Up' button at the top-right corner. Fill in your details and choose your role — College, Student, or Company. Once registered, you can log in using your credentials.",
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer:
        "Click on the 'Forgot Password' link on the login page. Enter your registered email, and you’ll receive a password reset link shortly.",
    },
    {
      question: "How can I apply for jobs?",
      answer:
        "After logging in as a student, visit the 'Jobs' section, browse available positions, and click on 'Apply' for your preferred job listings.",
    },
    {
      question: "How can colleges post job openings?",
      answer:
        "Colleges can log in to their dashboards and access the 'Post Job' section to add new openings with details like position, eligibility, and salary.",
    },
    {
      question: "How do I contact support for technical issues?",
      answer:
        "You can reach our support team through the Contact page or by emailing support@jobhire.com. We typically respond within 24 hours.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      <section className="help-section">
        <h2 style={{color:"white"}}>Help & Support</h2>
        <p style={{color:"white"}}>
          Welcome to the JobHire Help Center!  
          Here you’ll find answers to common questions, user guidance, and
          resources to make your experience smoother.
        </p>

        {/* FAQ Section */}
        <div className="faq-container">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{activeIndex === index ? "−" : "+"}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>Still Need Help?</h3>
          <p>
            If you didn’t find what you’re looking for, our support team is here
            to assist you.
          </p>
          <ul>
            <li><strong>Email:</strong> support@jobhire.com</li>
            <li><strong>Phone:</strong> +91 98765 43210</li>
            <li><strong>Live Chat:</strong> Available Mon–Fri, 10 AM – 6 PM</li>
          </ul>
          <button
            className="help-btn"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}
