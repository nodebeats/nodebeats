
//data store for holding objects
var localStore = {};

//localStorage mock for interacting with localStore
var fakeLocalStorage = {
    getItem: function (key) {
        return localStore[key];
    },
    setItem: function (key, value) {
        localStore[key] = val+'';
    },
    removeItem: function (key) {
        delete localStore[key];
    },
    clear: function() {
        localStore = {};
    }
};
function setupMockLocalStorage(windowObject) {
    //first, check to see if the browser is phantom
    if(windowObject.navigator && windowObject.navigator.userAgent.match(/Phantom/g)) {
        //localStorage object being read-only, we have to spy and redirect function calls...
        spyOn(windowObject.localStorage, 'getItem')
            .andCallFake(fakeLocalStorage.getItem);
        spyOn(windowObject.localStorage, 'setItem')
            .andCallFake(fakeLocalStorage.setItem);
        spyOn(windowObject.localStorage, 'removeItem')
            .andCallFake(fakeLocalStorage.removeItem);
        spyOn(windowObject.localStorage, 'clear')
            .andCallFake(fakeLocalStorage.clear);
    } else {
        //Anything other than Phantom, we can just replace the definition for windowObject.localStorage with our own custom one
        Object.defineProperty(windowObject, 'localStorage', {value: fakeLocalStorage, writable: true});
        //Create our spies so we can tell when functions were called, etc...
        //using .andCallThrough() tells the spy to allow the function to go ahead and get called rather than redirecting to another function
        spyOn(windowObject.localStorage, 'getItem')
            .andCallThrough();
        spyOn(windowObject.localStorage, 'setItem')
            .andCallThrough();
        spyOn(windowObject.localStorage, 'removeItem')
            .andCallThrough();
        spyOn(windowObject.localStorage, 'clear')
            .andCallThrough();
    }
}

//here's the object that actually gets exposed to be used by test fixtures
self.localStorageMockSpy = {
    setup: setupMockLocalStorage
};