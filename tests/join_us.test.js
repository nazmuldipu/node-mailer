const request = require("supertest");

let server;

describe("/", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
    });

    describe("POST /join-us", () => {
        let name;
        let email;

        const exec = async () => {
            return await request(server)
                .post("/join-us")
                .send({ name, email });
        };

        beforeEach(() => {
            name = "Ismail";
            email = "ismail@gmail.com"
        });

        it("should return 400 if name is null", async () => {
            name = null;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("should return 400 if name is greater thant 50 character", async () => {
            name = new Array(52).join("a");
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("should return 400 if email is less than 5 character", async () => {
            email = "abcd";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("should return 400 if email is greater than 60 character", async () => {
            email = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz@gmail.com";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("should return 400 if email is not a valid email address", async () => {
            email = "gmail.com";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("should return 200 if request is valid", async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});