import { response } from "express";
import supertest from "supertest";
import app from "../../main";

const baseurl = "localhost:3000";
const request = supertest(app);

describe("cinema-ticket-service", () => {
  afterAll((done) => {
    done();
  });

  test("should respond successfully given a valid order", async () => {
    const validBody = {
      accountId: 123,
      tickets: {
        adult: 2,
        child: 2,
        infant: 1,
      },
    };

    request
      .post("/v1/tickets/purchase")
      .send(validBody)
      .expect((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  test("should return a not found error when hitting an invalid endpoint", async () => {
    request.post("/invalidurl").expect((response) => {
      expect(response.status).toBe(404);
      done();
    });
  });

  it("should respond with a bad request given an invalid body", async () => {
    const invalidBody = {
      accountId: "NAN",
      tickets: {
        adult: 2,
        child: 2,
        infant: 1,
      },
    };

    request
      .post("/v1/tickets/purchase")
      .send(invalidBody)
      .expect((response) => {
        expect(response.status).toBe(400);
        done();
      });
  });
});
