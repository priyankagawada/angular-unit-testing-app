import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe("Testing Hero-detail Component", () => {
  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockActivatedRoute = { snapshot: { paramMap: { get: () => "3" } } };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    // create component instance using TestBed
    fixture = TestBed.createComponent(HeroDetailComponent);
  });

  it("should render hero name  in  a h2 tag", () => {
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 34 })
    );
    fixture.detectChanges(); // run the life cycle - ngOnInit()

    // Assert on the component template
    let name = fixture.nativeElement.querySelector("h2").textContent;
    expect(name).toContain("SUPERDUDE");
  });

  it("should call updateHero when save is called", async () => {
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 34 })
    );
    fixture.detectChanges();

    mockHeroService.updateHero.and.returnValue(of(true));
    //fixture.detectChanges();

    fixture.componentInstance.save();
    // special function on fixture to ask it to wait till
    // all callbacks are resolved
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalledTimes(1);
    });
  });
});
