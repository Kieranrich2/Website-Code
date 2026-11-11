const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendEnquiryEmail({ apiKey, to, email, service, subService, message }) {
    const subjectService = subService ? `${service} - ${subService}` : service;

    const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "onboarding@resend.dev",
            to,
            reply_to: email,
            subject: `New service enquiry: ${subjectService}`,
            text: `Email: ${email}\nService: ${subjectService}\nMessage: ${message}`,
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Resend API error (${response.status}): ${body}`);
    }
}
