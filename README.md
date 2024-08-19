# CareerConnect

**Unlock Your Career Potential with Mentor Connect**

## Overview

CareerConnect is a full-stack application designed to bridge the gap between mentors and users. Our platform leverages AI to help users connect with mentors who can guide them on their career journey. By analyzing user resumes, CareerConnect suggests mentors based on relevant keywords and helps users schedule meetings with the most suitable mentors.

## Demo Web App
![image](https://github.com/user-attachments/assets/7b7c257c-d4a4-4ca6-8bf7-41415c65272c)
![WhatsApp Image 2024-08-17 at 22 45 01_957bddbb](https://github.com/user-attachments/assets/7f250f89-2628-4232-b88a-88ff478385aa)
![image](https://github.com/user-attachments/assets/9f793754-669f-4b6f-a30d-d7d22790bb8e)
![Screenshot 2024-08-17 222742](https://github.com/user-attachments/assets/1833a2ee-4ac0-40a5-92ae-0d0346f39c99)

## Features

### User Side:
- **Registration & Verification:** Users sign up and verify their accounts via email.
- **Resume Upload:** Users can upload their resumes to the platform.
- **AI-Powered Mentor Suggestions:** Integrated with Gemini AI, the platform scans user resumes and suggests mentors based on extracted keywords.
- **Schedule Meetings:** Users can request meetings with mentors that match their career needs.
- **Email Notifications:** After a mentor accepts a meeting request, users receive a meeting link via email using Resend emails.

### Mentor Side:
- **View Scheduled Meetings:** Mentors can view all upcoming meeting requests for the week.
- **Accept/Reject Meetings:** Mentors have the option to accept or reject meeting requests.
- **Email Notifications:** Once a meeting is accepted, both mentors and users receive an email with the meeting link.

## Technology Stack

- **Frontend & Backend:** Next.js (used for both client and server-side functionality)
- **Database:** MongoDB
- **AI Integration:** Gemini AI for resume keyword extraction
- **Email Service:** Resend emails for email notifications and meeting links
- **Authentication:** JWT for secure login and session management

## Usage

1. **User Registration:** Users register and verify their accounts through email.
2. **Resume Upload:** Upload a resume, and the Gemini AI system will analyze it to extract key information.
3. **Mentor Suggestions:** Based on the AI analysis, the system will suggest mentors for the user.
4. **Schedule Meeting:** Users can request meetings with mentors.
5. **Mentor Actions:** Mentors can view and accept or reject meeting requests.
6. **Receive Meeting Link:** Once accepted, both parties will receive an email with the meeting link.

## Future Enhancements

- **Enhanced AI Matching:** Refine the AI algorithm to improve mentor recommendations.
- **Video Conferencing Integration:** Direct integration of video conferencing platforms.
- **Mobile Application:** Develop a mobile app version for easier access on the go.
  
## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
