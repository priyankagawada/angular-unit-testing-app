import { MessageService } from "./message.service";

describe("MessageService", () => {
  // declare a variable of type MessageService

  let service: MessageService;

  beforeEach(() => {
    // Creating object of MessageService
    service = new MessageService();
  });

  it("should have no messages at the start in the array", () => {
    // Act

    // assertion
    expect(service.messages.length).toEqual(0);
  });

  it("should have length > 0 when message is pushed into the array", () => {
    // Act -
    service.add("test message");
    // Assertion
    expect(service.messages.length).toBeGreaterThan(0);
  });

  it("should be length 0 when messages cleared from the array", () => {
    // Act
    service.add("test message");
    service.clear();

    // Assertion
    expect(service.messages.length).toEqual(0);
  });
});
