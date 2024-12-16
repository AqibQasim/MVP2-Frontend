async function eventScheduler({ eventUri, customer_id, interview_date, interview_time, job_posting_id, client_id }) {

    try {
        const response = await fetch(eventUri, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`, // Replace with your actual API key
            },
        });
        const data = await response.json();
        console.log("Event Details:", data);
        const payload = {
            endpoint: 'schedule-interview',
            method: 'POST',
            body: {
                customer_id,
                interview_date,
                interview_time,
                job_posting_id,
                client_id
            }
        }
        console.log(payload)
        const result = await mvp2ApiHelper(payload);
        return {...result}
        // Access the date and time from the response, e.g., data.start_time
    } catch (error) {
        console.error("Error fetching event details:", error);
    }
}