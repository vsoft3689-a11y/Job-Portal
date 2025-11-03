import React, { useState } from "react";
import "../App.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="page-container">
      <section className="contact-section">
        <h2 style={{color:"white"}}>Contact Us</h2>
        <p style={{color:"white"}}>
          Have questions, feedback, or partnership inquiries? We’d love to hear from you.
          Get in touch with the EduHire Portal team using the form below or through
          our contact details.
        </p>

        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Our Office</h3>
            <p>JobHire Solutions Pvt. Ltd.</p>
            <p>123 Knowledge Park, Bengaluru, India</p>
            <p><strong>Email:</strong> support@eduhire.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Working Hours:</strong> Mon–Fri, 9 AM – 6 PM</p>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
