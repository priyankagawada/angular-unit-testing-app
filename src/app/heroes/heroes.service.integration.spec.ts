import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

describe("Test Suite for HTTPClient", () => {
  let backend: HttpTestingController;
  let service: HeroService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });

    // Create objects of services
    service = TestBed.get(HeroService);
    // messageService = TestBed.get(MessageService);
    backend = TestBed.get(HttpTestingController);
  });

  it("Should call the backend URL and return the response", () => {
    let result: Hero;
    // backend = TestBed.get(HttpTestingController);
    service.getHero(4).subscribe((x) => {
      result = x;
    }); // call to httpclient.get("api/heroes/4")
    //service.getHero(5).subscribe();
    const req = backend.expectOne("api/heroes/4");
    // Assertion
    backend.verify();
    //const req = backend.expectOne("api/heroes/5");
    req.flush({ id: 4, name: "Super Woman", Strength: 43 });
    // verify if the request is matched

    // Assertion
    expect(result.name).toContain("Super Woman");
  });

  // Verify if the request was sent with hero object
  it("Should call the backend URL for POST sent with Data", () => {
    let hero = { id: 199, name: "Batman", strength: 34 };
    let str = "dummy";
    let url = "api/heroes";
    let result: Hero;
    // ACT
    service.addHero(hero).subscribe((x) => {
      result = x;
    });

    const req = backend.expectOne({ method: "POST", url: url });

    // Assertion
    expect(req.request.body).toBe(hero);
  });
});
