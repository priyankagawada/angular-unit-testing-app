import { analyzeAndValidateNgModules } from "@angular/compiler";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
  // declare the variable of type HeroesComponent
  let component: HeroesComponent;

  let mockHeroService: any;

  // The HeroesComponent has  heroes: Hero[]; property
  // For testing we need to initialize the heroes with dummy data
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 100, name: "Spider Man", strength: 8 },
      { id: 200, name: "Wonder Woman", strength: 43 },
      { id: 300, name: "Bat Man", strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj(["getHeroes", "deleteHero"]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from the heroes list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Arrange
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(component.heroes.length).toBe(2);
    });

    // Verify the service calls
    it("should verify the call given to deleteHero of mocked HelloService", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Arrange
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert - the call to the deleteHero() method is verified
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    });

    // Verify the service calls with done with parameter
    it("should verify the call given to deleteHero with paramters passed to it", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Arrange
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert - the call to the deleteHero() method is verified
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith({
        id: 300,
        name: "Bat Man",
        strength: 55,
      });
    });

    it("should verify the call to deleteHero is made atleast once", () => {});

    it("should return an array of heroes", () => {
      // Arrange
      // when().then()
      mockHeroService.getHeroes.and.returnValue(of(HEROES));

      // Act
      component.getHeroes();

      // Assert
      expect(component.heroes.length).toEqual(3);
    });
  });
});
