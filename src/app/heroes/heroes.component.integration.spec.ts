import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Component Integration (Shallow) Test Suite", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: any;
  let HEROES;

  // declare the Fake Hero Component
  @Component({
    selector: "app-hero",
    template: "<div> child component </div>",
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
  beforeEach(() => {
    // Fake Mock HelloService
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "deleteHero",
      "addHero",
    ]);
    // step1
    // Introduce TestBed Utility here...
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    // step 2 - when HEroesComponent object is created
    // it will be injected with mockHeroService object
    fixture = TestBed.createComponent(HeroesComponent);
  });

  // unit test
  it("Should create the component", () => {
    // Arrange
    let component: HeroesComponent = null;
    // return instance of the component
    component = fixture.componentInstance;
    // Assert
    expect(component).not.toBeNull();
  });

  // integrattion test - test whether the child tag was added
  it("should create one li for each hero element to be added", () => {
    // Arrange
    HEROES = [
      { id: 100, name: "Spider Man", strength: 8 },
      { id: 200, name: "Wonder Woman", strength: 43 },
      { id: 300, name: "Bat Man", strength: 55 },
    ];
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Act
    fixture.detectChanges(); // call to ngOnInit() method

    // Assert
    // expect(fixture.componentInstance.heroes.length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
  });

  it("should add new hero in the list on the click of add button", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // mock behaviour of addHeroes()
    const name = "ABC";
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 23 })
    );

    // ACT - input element and button
    let inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;

    let addButton = fixture.debugElement.query(By.css("#addButton"));

    inputElement.value = name;
    addButton.triggerEventHandler("click", null);

    fixture.detectChanges();

    // Assert

    let de = fixture.debugElement.queryAll(By.css("li"));
    //console.log(heroName);

    // IF new hero is added then one more <li> is added with hero
    expect(de.length).toBe(4);
  });
});
