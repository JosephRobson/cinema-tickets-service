import supertest from "supertest";
import app from "../../main";

const baseurl = "localhost:3000";
const request = supertest(app);
// const request = supertest(baseurl);

describe("cinema-ticket-service", () => {
  test("should respond successfully given a valid order", async () => {
    const validBody = {
      accountId: 123,
      tickets: {
        adult: 2,
        child: 2,
        infant: 1,
      },
    };
    const response = await request.post("/v1/tickets/purchase").send(validBody);

    expect(response.status).toBe(201);
  });

  test("should return a not found error when hitting an invalid endpoint", async () => {
    const response = await request.get("/invalidurl");

    expect(response.status).toBe(404);
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
    const response = await request
      .post("/v1/tickets/purchase")
      .send(invalidBody);

    expect(response.status).toBe(400);
  });
});
