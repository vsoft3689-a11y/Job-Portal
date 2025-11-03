package com.jobportal.Job_Portal.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

//    public void sendJobApplicationMail(String toEmail, String jobTitle) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject("Job Application Submitted");
//        message.setText("You have successfully applied for the job: " + jobTitle);
//        mailSender.send(message);
//    }

    // Email to applicant
    public void sendJobApplicationMailToApplicant(String toEmail, String jobTitle) {
        String subject = "Job Application Submitted Successfully";
        String htmlContent = """
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                    <div style="background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #2E86C1;">Job Application Submitted</h2>
                        <p>Dear Applicant,</p>
                        <p>We have received your application for the job position: <strong>%s</strong>.</p>
                        <p>We will notify you once your application is reviewed.</p>
                        <br/>
                        <p style="font-size: 14px; color: #555;">Thank you for using our platform!<br/>
                        <strong>Job Portal Team</strong></p>
                    </div>
                </body>
                </html>
                """.formatted(jobTitle);

        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    private void sendHtmlEmail(String toEmail, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // Enable HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
