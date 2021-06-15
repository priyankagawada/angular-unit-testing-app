/*describe('my first test suite', function(){
})*/

describe("my first  test suite", () => {
  // declare variable - global and used by all test cases inside the suite
  // life cycle methods - beforeEach(), afterEach(), beforeAll(), afterAll()
  // beforeEach() is executed before every test case
  var myobject;

  // setup - initialization of object
  beforeEach(function () {
    console.log("BeforeEach() called...");
    myobject = {};
  });

  afterEach(function () {
    console.log("afterEach() called...");
  });

  beforeAll(function () {
    console.log("Called Once before test cases are executed");
  });

  // test case
  it("should be true", () => {
    // Arrange - declared a property and initialized it
    myobject.x = false;

    // Act - set a new value for the property x
    myobject.x = true;

    // Assert - toBe() matchers which is strict
    expect(myobject.x).toBe(true);
  });

  it("should contain a specific element in arr", () => {
    // Arrange  + Act - declare an array and initializa it
    let arr = [1, 2, 3];

    // Assertion - arr contains elements
    expect(arr).toContain(3);
  });

  it("should return true if two array objects are same", () => {
    // Arrange  - declare an array and initializa it
    let arr1 = [1, 2, 3];

    // Act
    let arr2 = arr1;

    // Assertion - arr contains elements
    expect(arr1).toBe(arr2);
  });

  xit("should return true if arr has values 1, 2, and 3", () => {
    // Arrange  - declare an array and initializa it
    let arr1 = [1, 2, 3];

    // Act
    let arr2 = arr1;

    // Assertion - arr contains elements
    expect(arr1).toEqual([1, 2, 4]);
  });
});
