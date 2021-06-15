import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe("HeroComponent Suite", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    // loading of modules along with the required components
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA], // ignore routerLink
    });

    // Fixture is the wrapper over the instantiated component
    fixture = TestBed.createComponent(HeroComponent);
  });

  // unit test
  it("Should create the component", () => {
    // Arrange
    let component: HeroComponent = null;
    // return instance of the component
    component = fixture.componentInstance;
    // Assert
    expect(component).not.toBeNull();
  });

  // unit test
  it("Should initialize the hero property with data", () => {
    // Arrange
    fixture.componentInstance.hero = {
      id: 100,
      name: "Wonder Woman",
      strength: 34,
    };

    // Assert
    expect(fixture.componentInstance.hero.name).toEqual("Wonder Woman");
  });

  // integration test - component template
  it("should display id and name on HeroComponent template ", () => {
    fixture.componentInstance.hero = {
      id: 100,
      name: "Wonder Woman",
      strength: 34,
    };

    // change detection mechansim  - update the template with data binding
    // and life cycle methods - ngOnInit()
    fixture.detectChanges();

    // Assert
    let de = fixture.debugElement.query(By.css(".delete"));
    expect(de.nativeElement.disabled).toBeFalsy();
  });
});
