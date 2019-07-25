# Jest Concepts
- Test launchers ( Jest, Karma, Jasmine)
  - list of tests and configuration and scaffolding to run these tests
- Testing Structure ( Mocha, Jasmine, Jest, Cucumber)
  - BDD style
- Assertion functions ( Chai, Jasmine, Jest)
- Generate and disaply test progress ( Mocha, Jasmine, Jest, Karma)
- Mocks, spies and Stubs ( Sinion, Jasmine, enzyme, jest)
- Generate and compare sanpshots ( Jest, Ava)
- Browser Controlls (Puppeteer, Phantom)
- Visual Regression tools (Applitools, Percy, Wraith, WebDriverCSS)

## Setup and Teardown
- `beforeEach` function will execute `before` for every `test` or `it` tests inside `describe` block.
- `afterEach` function will execute `after` for every `test` or `it` tests inside `describe` block.
- `beforeAll` function will execute `before` once for `describe` block.
- `afterAll` function will execute `after` once for `describe` block.

## Assertions
- `expect` is similar to junit `assertThat` function
```js
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
```  
## Matchers
- `toBe` uses `Object.is` to test exact equality.
- `toEqual` checks value of object.
- `Truthiness` matcher functions
  - `toBeNull`
  - `toBeUndefined`
  - `toBeUndefined`
  - `toBeTruthy`
  - `toBeFalsy`
- `Numbers` Matchers
  - `toBeGreaterThan`
  - `toBeGreaterThanOrEqual`
  - `toBeLessThan`
  - `toBeLessThanOrEqual`
  - `toBeCloseTo` for floating point `Numbers`
- `String` Matchers
  - `toMatch` using RegEx
  - `not.toMatch`
- `Arrays` Matchers
  - `toContain`
- `Promise` Matchers
  - `resolves`
  - `rejects` 
## Asynchronous Functions testing
- Callback
```js
    it('should invoke callback function and verify results', (done) => {
        function callback(data) {
            expect(data).toBe('test');
            done(); // Test will wait till done function called
        }

        fetchData(callback);
    });
```
- Promise
  - If test returns promise `jest` will wait for Promise to resolve.
```js
    test('the data is peanut butter', () => {
        // Return is keyword to wait for promise to be resolved
        return fetchData().then(data => {
            expect(data).toBe('peanut butter');
        });
    });

    // Use catch method to test Promise reject scenarios
    // Expect assertions is important for error scenario in case verifying in catch block.
    test('the fetch fails with an error', () => {
        expect.assertions(1);
        return fetchData().catch(e => expect(e).toMatch('error'));
    });
```
- Resolves / Rejects
```js
    test('the data is peanut butter', () => {
        return expect(fetchData()).resolves.toBe('peanut butter');
    });

    test('the fetch fails with an error', () => {
        return expect(fetchData()).rejects.toMatch('error');
    });
``` 
- Async / Await
  - Use `async` keyword before function definition.
  - Use `await` for every promise to be resolved or rejected
```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```   
## Mock Functions
- Simple mock function
```js
    const mockFn = jest.fn();
```
- Mock function with implementation
```js
    const mockFnImpl = jest.fn().mockImplementation(() => Promise.resolve({}));

    //Multiple data return for each call
    const mockFnImpl = 
        jest.fn(() => 0)
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => 2);
    console.log(mockFnImpl(), mockFnImpl(), mockFnImpl(), mockFnImpl());
    // Expected 1, 2, 0, 0        
```  
- Mock function to return `this`
```js
    jest.fn().mockReturnThis();

    jest.fn(() => this);
```  

## Mock Return Values
```js
    const mockFn = jest.fn();
    mockFn
        .mockReturnValueOnce(1)
        .mockReturnValueOnce('test')
        .mockReturnValueOnce(true)
```
## Mock Calls and Instances
- `Instance`
- `call`
- `results`
```js
    console.log(mockFn.mock.calls.length);
    console.log(mockFn.mock.calls[0][0]); //First argument of first call
    console.log(mockFn.mock.instances.length) // No of times is instantiated    
    console.log(mockFn.getMockName());
``` 

## Mock Matchers
- `toBeCalled`
- `toBeCalledWith`
- `lastCalledWith`

## Mock fetch implementation
```js
    const mockData = [
      { id: 1, title: 'Buy pizza' },
      { id: 2, title: 'Watch Netflix' }
    ];

    const mockResponse = {
      ok: true,
      json: function() {
        return mockData;
      }
    };

    window.fetch = jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockResponse));
```

## Debug
- Use `debug()` method on wrapper instance to view internal virtual DOM.
```js
    const wrapper = shallow(<App {...props}/>);
    console.log(wrapper.debug());
```  
