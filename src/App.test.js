/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import {
  generateStats,
  callbackPromise,
  validateForm,
  UserForm,
  registrationProcess,
  UserData,
  asyncProcess,
  backgroundProcess
} from './App';

/**
 * It checks whether the given promise is rejected and
 * return the error value.
 *
 * @param {Promise} promise A promise to be checked
 * @return {any} The error captured
 */
async function captureException(promise) {
  let exception = null;
  try {
    await promise;
  } catch (err) {
    exception = err;
  }
  return exception;
}

/**
 *
 * @param {Array} items The list of items that the function returned will return
 * on each call.
 * @param {(index:number,item:any,items:Array)=>void} cb Callback that will be invoked on
 * each item, in order to control the production flow.
 */
function createProducer(items, cb = null) {
  let curIndex = 0;

  return async () => {
    if (cb) cb(curIndex, items[curIndex], items);
    return items[curIndex++];
  };
}

/**
 * It waits until a certain amount of time has passed
 *
 * @param {number} amount
 * @returns {Promise} A promise that will be resolved after `amount` milliseconds
 */
function sleep(amount) {
  return new Promise((resolve, reject) => {
    const t0 = new Date().getTime();

    setTimeout(() => {
      const t1 = new Date().getTime();
      resolve(t1 - t0);
    }, amount);
  });
}

function time() {
  return new Date().getTime();
}

// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
describe('generateStats', () => {
  /**
   * Default callback that returns the same it accepts.
   * Named so for the sake of shortness
   */
  const _ = (d, e) => ({ d, e });
  test('The function should validate input arguments', () => {
    expect(generateStats(undefined, _).e).toBe('Invalid input');
    expect(generateStats(null, _).e).toBe('Invalid input');
    expect(generateStats('', _).e).toBe('Invalid input');
    expect(generateStats(5, _).e).toBe('Invalid input');
    expect(generateStats({}, _).e).toBe('Invalid input');
  });
  test('The function should use the given callback', () => {
    const cb = jest.fn(_);
    generateStats([], cb);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('The function should use the callback arguments in the right order', () => {
    const result = generateStats(null, _);
    expect(result.d).toBeNull();
    expect(result.e).toBe('Invalid input');
  });
  test('The function algorithm should work when input is empty', () => {
    expect(generateStats([], _).d).toEqual({});
    expect(generateStats([null], _).d).toEqual({});
  });
  test('The function algorithm should work when no duplicates', () => {
    expect(generateStats(['a', 'b', 'c'], _).d).toEqual({ a: 1, b: 1, c: 1 });
    expect(generateStats(['a', 'b', 'c', null], _).d).toEqual({
      a: 1,
      b: 1,
      c: 1
    });
    expect(generateStats([null, 'a', 'b', 'c'], _).d).toEqual({
      a: 1,
      b: 1,
      c: 1
    });
  });
  test('The function algorithm should recognize letter case and variations', () => {
    expect(generateStats(['a', 'A', 'á'], _).d).toEqual({ a: 1, A: 1, á: 1 });
  });
  test('The function algorithm should count duplicates and variations', () => {
    expect(generateStats(['a', 'a'], _).d).toEqual({ a: 2 });
    expect(generateStats(['a', 'a', 'A'], _).d).toEqual({ a: 2, A: 1 });
    expect(generateStats(['a', 'A', 'A', 'a'], _).d).toEqual({ a: 2, A: 2 });
  });
  test('The function should return the callback response', () => {
    const ref = Symbol('output');
    expect(generateStats(['a'], () => ref)).toBe(ref);
  });
});
// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
describe('callbackPromise', () => {
  const _ = (a) => a;
  const failWith = (err) => (a) => {
    throw err;
  };

  beforeEach(() => { });
  test('The function should return a promise', () => {
    expect(callbackPromise(0, [], _)).toBeInstanceOf(Promise);
  });
  test('The function should make use of the callback provided', async () => {
    const cb = jest.fn(_);
    await callbackPromise(0, [], cb);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('The promise should be rejected in case of error', () => {
    const err = Symbol('Some error');
    return expect(callbackPromise(0, [], failWith(err))).rejects.toBe(err);
  });
  test('The promise should be resolved if data is valid', (done) => {
    callbackPromise(0, [], _)
      .then((data) => {
        done();
      })
      .catch((e) => {
        throw new Error(`Promise should not have failed with error ${e}`);
      });
  });
  test('The promise should not be resolved before the given time', (done) => {
    const t0 = new Date().getTime();
    const time = 250; // milliseconds
    callbackPromise(time, [], _).then((data) => {
      const t1 = new Date().getTime();
      expect(t1 - t0).toBeGreaterThanOrEqual(time);
      done();
    });
  });
  test('The promise should not take too much time', (done) => {
    const t0 = new Date().getTime();
    const time = 250;
    const threshold = 50;
    callbackPromise(time, [], _).then((data) => {
      const t1 = new Date().getTime();
      expect(t1 - t0).toBeLessThanOrEqual(time + threshold);
      done();
    });
  });
  test('The promise should resolve an array instance', () => {
    return expect(callbackPromise(0, [1, 2, 3], _)).resolves.toBeInstanceOf(
      Array
    );
  });
  test('The promise algorithm must perform the matrix sum', () => {
    const input = [0, -1, -2, -3, -4, -5];
    const cb = () => [0, 1, 2, 3, 4, 5];
    return expect(callbackPromise(0, input, cb)).resolves.toEqual([
      0, 0, 0, 0, 0, 0
    ]);
  });
});
// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
describe('validateForm', () => {
  const userAlwaysExists = () => Promise.resolve(true);
  const userNeverExists = () => Promise.resolve(false);
  const defaultUser = new UserForm({
    username: 'name',
    password: 'pass',
    confirmPassword: 'pass'
  });

  test('It should return a promise', () => {
    const result = validateForm(defaultUser, userNeverExists);
    expect(result).toBeInstanceOf(Promise);
  });
  test('It should invoke the userExists() function', async () => {
    const cb = jest.fn(userNeverExists);
    validateForm(defaultUser, cb);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('It should fail when username is null', async () => {
    const exception = await captureException(
      validateForm({ ...defaultUser, userName: null }, userNeverExists)
    );
    expect(exception).toBe('userName cannot be null');
  });
  test('It should fail when password is null', async () => {
    const exception = await captureException(
      validateForm({ ...defaultUser, password: null }, userNeverExists)
    );
    expect(exception).toBe('password cannot be null');
  });
  test('It should fail when passwords do not match', async () => {
    const exception = await captureException(
      validateForm(
        { ...defaultUser, confirmPassword: defaultUser.password + '.' },
        userNeverExists
      )
    );
    expect(exception).toBe("passwords don't match");
  });
  test('It should fail when username already exists', async () => {
    const exception = await captureException(
      validateForm(defaultUser, userAlwaysExists)
    );
    expect(exception).toBe('userName already exists');
  });
  test('It should return the user data when the validation is correct', async () => {
    expect(await validateForm(defaultUser, userNeverExists)).toEqual(
      defaultUser
    );
  });
});
// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
describe('registrationProcess', () => {
  const userData = new UserData({
    username: 'User name',
    password: 'password',
    email: 'e@mail'
  });
  const getUserData = async () => userData;
  const validateData = async (data) => new Date().getTime();
  const saveUserData = async (data) => 'uid-' + new Date().getTime();
  const failWith = (err) => async () => {
    throw err;
  };

  test('It should return a promise', () => {
    const result = registrationProcess(getUserData, validateData, saveUserData);
    expect(result).toBeInstanceOf(Promise);
  });
  test('It should call getUserData()', async () => {
    const cb = jest.fn(getUserData);
    await registrationProcess(cb, validateData, saveUserData);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('It should capture the errors thrown in getUserData()', async () => {
    expect(
      await captureException(
        registrationProcess(failWith('getUserData'), validateData, saveUserData)
      )
    ).toBe('REGISTRATION FAILED: getUserData');
  });
  test('It should call validateData()', async () => {
    const cb = jest.fn(validateData);
    await registrationProcess(getUserData, cb, saveUserData);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('It should call validateData() with the output of getUserData()', async () => {
    const cb = jest.fn(validateData);
    await registrationProcess(getUserData, cb, saveUserData);
    expect(cb).toHaveBeenCalledWith(userData);
  });
  test('It should capture the errors thrown in validateData()', async () => {
    expect(
      await captureException(
        registrationProcess(getUserData, failWith('validateData'), saveUserData)
      )
    ).toBe('REGISTRATION FAILED: validateData');
  });
  test('It should call saveUserData()', async () => {
    const cb = jest.fn(saveUserData);
    await registrationProcess(getUserData, validateData, cb);
    expect(cb.mock.calls).toHaveLength(1);
  });
  test('It should call saveUserData() with the output of getUserData()', async () => {
    const cb = jest.fn(saveUserData);
    await registrationProcess(getUserData, validateData, cb);
    expect(cb).toHaveBeenCalledWith(userData);
  });
  test('It should capture the errors thrown in saveUserData()', async () => {
    expect(
      await captureException(
        registrationProcess(getUserData, validateData, failWith('saveUserData'))
      )
    ).toBe('REGISTRATION FAILED: saveUserData');
  });
  test('It should return the user input data', async () => {
    const data = await registrationProcess(
      getUserData,
      validateData,
      saveUserData
    );
    expect(data).toHaveProperty('userData');
    expect(data.userData).toBeInstanceOf(UserData);
    expect(data.userData).toEqual(userData);
  });
  test('It should return the validation code', async () => {
    const cb = jest.fn(validateData);
    const data = await registrationProcess(getUserData, cb, saveUserData);
    const validationCode = await cb.mock.results[0].value;

    expect(data).toHaveProperty('validationCode');
    expect(data.validationCode).toBe(validationCode);
  });
  test('It should return the new user identifier', async () => {
    const cb = jest.fn(saveUserData);
    const data = await registrationProcess(getUserData, validateData, cb);
    const userId = await cb.mock.results[0].value;

    expect(data).toHaveProperty('userId');
    expect(data.userId).toBe(userId);
  });
});
// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
describe('asyncProcess', () => {
  const defaultProduction = [[1, 2, 3], [4, 5, 6], [7], [8]];
  const defaultProducer = () => createProducer(defaultProduction);
  const defaultConsumer = () => async (data) => data;

  test('It should return an async function', () => {
    const result = asyncProcess(1, defaultProducer(), defaultConsumer());
    expect(result).toBeInstanceOf(Promise);
  });
  test('It should call the produce() function the right amount of times', async () => {
    const cb = jest.fn(defaultProducer());
    const times = defaultProduction.length;
    await asyncProcess(times, cb, defaultConsumer(), 'fgusss');
    expect(cb.mock.calls).toHaveLength(times);
  });
  test('It should call the consume() function the right amount of times', async () => {
    const production = [
      [1, 2, 3, 4, 5],
      [2, 3, 4],
      [3, 4, 5]
    ];
    const producer = createProducer(production);
    const cb = jest.fn(defaultConsumer());
    const times = production.length;
    await asyncProcess(times, producer, cb);

    expect(cb.mock.calls).toHaveLength(production.flatMap((i) => i).length);
  });
  test('It should fail if producer raises an error', async () => {
    const times = 50;
    // Producer that throws an error on iteration 3
    const brokenProducerBuilder = (iteration) => {
      const items = [];
      for (let i = 0; i < iteration + 1; i++) items.push([i]);
      return createProducer(items, (index) => {
        if (index === iteration) throw new Error('error-at-' + index);
      });
    };

    // Test that it fails on iteration #3
    let err = await captureException(
      asyncProcess(times, brokenProducerBuilder(3), defaultConsumer())
    );
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Error on iteration 3: error-at-3');

    // Test that it fails on iteration #5
    err = await captureException(
      asyncProcess(times, brokenProducerBuilder(5), defaultConsumer())
    );
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Error on iteration 5: error-at-5');
  });

  test('It should return the right production', async () => {
    const production = [[1, 2, 3], [4, 5, 6], [7]];
    const producer = createProducer(production);
    // Reverse-additive consumer
    const additiveConsumer = (amount) => async (data) => data + amount;

    const result = await asyncProcess(
      production.length,
      producer,
      additiveConsumer(3)
    );
    expect(result).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });
});
// --------------------------------------------------------------------------------
// EXERCISE 6
// --------------------------------------------------------------------------------
describe('backgroundProcess', () => {
  const STATUSES = {
    Idle: 0,
    Running: 1,
    Finished: 2
  };
  const MAX_MS = 100;
  const defaultProduction = [[1, 2, 3], [4, 5, 6], [7], [8], null];
  const defaultProducer = () => createProducer(defaultProduction);
  const emptyProducer = () => createProducer([null]);
  const defaultConsumer = () => async (data) => data;
  const periodicChecker = (fn, period, check) =>
    new Promise((resolve, reject) => {
      let done = false;
      let iteration = 0;
      let elapsed = 0;
      const id = setInterval(() => {
        try {
          elapsed += new Date().getTime();
          const result = fn();
          if (check) {
            check(iteration, elapsed, result);
          }

          if (result.status === STATUSES.Finished) {
            done = true;
            resolve(result);
          }
        } catch (e) {
          done = true;
          reject(e);
        } finally {
          if (done) clearInterval(id);
        }
      }, period);
    });
  const processCompleted = (fn) =>
    new Promise((resolve, reject) => {
      if (typeof fn != 'function') {
        reject('The process response is not a function');
      } else {
        const start = time();

        const id = setInterval(() => {
          let clear = false;

          try {
            const stats = fn();
            const elapsed = time() - start;
            if (elapsed > 10 * MAX_MS) {
              throw new Error('Function took too much time to finish');
            }

            if (stats.status === STATUSES.Finished) {
              clear = true;
              resolve(stats);
            }
          } catch (err) {
            clear = true;
            reject(err);
          } finally {
            if (clear) {
              clearInterval(id);
            }
          }
        }, 25);
      }
    });

  test('It should return an async function', () => {
    const fn = backgroundProcess(emptyProducer(), defaultConsumer());
    expect(typeof fn).toBe('function');
  });

  test('It should return the right structure after invoking returned function', () => {
    const fn = backgroundProcess(emptyProducer(), defaultConsumer());
    const result = fn();
    expect(result).toHaveProperty('available');
    expect(result).toHaveProperty('totalProduced');
    expect(result).toHaveProperty('status');
  });

  test('It should finish in a finite amount of time', (done) => {
    const array = [[1], [2], null];
    const producer = createProducer(array);
    const fn = backgroundProcess(producer, defaultConsumer());
    // setInterval may take a bit more than the time stated
    processCompleted(fn).then(() => {
      done();
    });
  });

  test('It should call producer the right amount of times', async () => {
    const array = [[1], [2], [3], [4], [5], null];
    let calls = 0;

    const producer = createProducer(array, () => calls++);
    const fn = backgroundProcess(producer, defaultConsumer());

    await processCompleted(fn);
    expect(calls).toBe(array.length);
  });

  test('It should call consumer the right amount of times', async () => {
    const array = [[1], [2, 3, 4], [5, 6], null];
    let calls = 0;
    const producer = createProducer(array);
    const consumer = async (item) => calls++;

    await processCompleted(backgroundProcess(producer, consumer));
    expect(calls).toBe(array.flatMap((i) => i).length - 1); // null is not consumed
  });

  test('It should clear the production queue after each invocation of the resulting function', () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [7, 8, 9], null];
    const producer = createProducer(array);
    let consumed = [];
    const consumer = async (item) => {
      consumed.push(item);
      return item;
    };

    const fn = backgroundProcess(producer, consumer);

    const promise = periodicChecker(fn, 150, (iteration, elapsed, result) => {
      expect(result.available).toEqual(consumed);
      consumed = [];
    });

    return expect(promise).resolves.toBeDefined();
  });

  test('It should count the number of products produced in background', () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9], null];
    const producer = createProducer(array);
    let consumed = [];
    const consumer = async (item) => {
      consumed.push(item);
      return item;
    };

    const fn = backgroundProcess(producer, consumer);

    const promise = periodicChecker(fn, 300, (iteration, elapsed, result) => {
      expect(result.totalProduced).toBe(consumed.length);
    });

    return expect(promise).resolves.toBeDefined();
  });

  test('It should have status=0 if the process has not been started yet', async () => {
    const fn = backgroundProcess(defaultProducer(), defaultConsumer());
    expect(fn().status).toBe(STATUSES.Idle);

    await processCompleted(fn);
  });

  test('It should have status=1 if the process is being executed', async () => {
    const array = [[1, 2, 3], [4, 5, 6], [7, 8, 9], null];
    const producer = createProducer(array);
    const fn = backgroundProcess(producer, defaultConsumer());

    await sleep(MAX_MS);
    const result = fn();
    expect(result.status).toBe(STATUSES.Running);
  });

  test('It should have status=2 if the process has finished', async () => {
    const array = [[1, 2, 3], null];
    const producer = createProducer(array);
    const fn = backgroundProcess(producer, defaultConsumer());
    await processCompleted(fn);

    expect(fn().status).toBe(STATUSES.Finished);
  });
});
