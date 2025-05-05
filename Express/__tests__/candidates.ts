import request from 'supertest';
import app from '../src/app';
import * as redis from '../src/utils/redis';
import * as daoLayer from '../src/daoLayer/candidate';
import * as services from '../src/services/candidate';
import mailQueue from '../src/queues/mail';

// Mock DAO layer
jest.mock('../src/daoLayer/candidate');
// Mock service layer (if updateCandidate is imported from there)
jest.mock('../src/services/candidate', () => ({
    ...jest.requireActual('../src/services/candidate'),
    getCandidate: jest.fn(),
    updateCandidate: jest.fn(),
    createCandidate: jest.fn(),
}));;

// Mock Redis methods
jest.mock('../src/utils/redis', () => ({
    getCache: jest.fn(),
    setCache: jest.fn(),
    deleteCache: jest.fn(),
    checkKey: jest.fn(),
}));

// Mock BullMQ Queue
jest.mock('bullmq', () => {
    const mQueue = {
        add: jest.fn(),
        on: jest.fn(),
        close: jest.fn(),
    };
    const mWorker = {
        on: jest.fn(),
        close: jest.fn(),
    };
    return {
        Queue: jest.fn(() => mQueue),
        Worker: jest.fn(() => mWorker),
    };
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('POST /api/v1/candidates', () => {
    const email = 'test@example.com';
    const reqData = {
        firstName: 'John',
        lastName: 'Doe',
        email,
        phoneNumber: '123456789',
        preferredTime: 'Morning',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new candidate if email does not exist', async () => {
        // Mock Redis
        (redis.getCache as jest.Mock).mockResolvedValue(null);
        (redis.setCache as jest.Mock).mockResolvedValue(undefined);
        (redis.deleteCache as jest.Mock).mockResolvedValue(undefined);
        (redis.checkKey as jest.Mock).mockResolvedValue([]);

        // Mock DAO layer
        (daoLayer.getOne as jest.Mock).mockResolvedValue(null);
        (daoLayer.create as jest.Mock).mockResolvedValue({
            ...reqData,
        });

        // Mock updateCandidate
        (services.updateCandidate as jest.Mock).mockResolvedValue({
            ...reqData,
        });

        const res = await request(app)
            .post('/api/v1/candidates')
            .send(reqData);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Candidate added successfully');
        expect(mailQueue.add).toHaveBeenCalled();
        expect(daoLayer.create).toHaveBeenCalledWith(reqData);
    });

    it('should update an existing candidate if email exists', async () => {
        // Mock Redis
        (redis.getCache as jest.Mock).mockResolvedValue(null);
        (redis.setCache as jest.Mock).mockResolvedValue(undefined);
        (redis.deleteCache as jest.Mock).mockResolvedValue(undefined);
        (redis.checkKey as jest.Mock).mockResolvedValue([]);
    
        // Mock service layer
        (services.getCandidate as jest.Mock).mockResolvedValue({ ...reqData }); // pretend candidate exists
        (services.updateCandidate as jest.Mock).mockResolvedValue({ ...reqData }); // mock update success
    
        const res = await request(app)
            .post('/api/v1/candidates')
            .send(reqData);
    
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Candidate added successfully');
        expect(mailQueue.add).toHaveBeenCalled();
        expect(daoLayer.create).toHaveBeenCalledWith(reqData);
    });
});


describe('POST /api/v1/candidates - validation', () => {
    const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123456789',
        preferredTime: 'Morning',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
    };

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app)
            .post('/api/v1/candidates')
            .send({}); // empty body

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/First name is required|last name|email|phone/i);
    });

    it('should return 400 for invalid email and LinkedIn URL', async () => {
        const res = await request(app)
            .post('/api/v1/candidates')
            .send({
                ...validData,
                email: 'not-an-email',
                linkedinUrl: 'not-a-url',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/Invalid email address|Invalid LinkedIn URL/i);
    });

    it('should accept valid data and return 201', async () => {
        (redis.getCache as jest.Mock).mockResolvedValue(null);
        (redis.setCache as jest.Mock).mockResolvedValue(undefined);
        (redis.deleteCache as jest.Mock).mockResolvedValue(undefined);
        (redis.checkKey as jest.Mock).mockResolvedValue([]);

        const res = await request(app)
            .post('/api/v1/candidates')
            .send(validData);

        expect([200, 201]).toContain(res.status);
    });
});
