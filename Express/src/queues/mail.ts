import { Queue, Worker, Job } from "bullmq";
import redisClient from "../utils/redis";
import { sendMail } from "../services/mail";
import { candidateApplicationTemplate } from "./../services/template";

const mailQueue = new Queue("mailQueue", {
    connection: redisClient,
});

export const mailWorker = new Worker(
    "mailQueue",
    async (job: Job) => {
        console.log(`📢 Processing Email for jobId (${job.id}): ${job.data.type} for Candidate Email: ${job.data.email}`);

        let message = "";

        switch (job.data.type) {
            case "Receive_Application":
                await sendMail(candidateApplicationTemplate(job.data.firstName, job.data.email))
                break;

        }

    },
    { connection: redisClient }
);

mailWorker.on('completed', (job) => {
    console.log(`✅ Email job ${job.id} completed.`);
});

mailWorker.on('failed', (job: any, err) => {
    console.error(`❌ Email job ${job.id} failed:`, err.message);
});

export default mailQueue;