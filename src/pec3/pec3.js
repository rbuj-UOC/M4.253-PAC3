/**
 * User input read from a web form
 */
export class UserForm {
  constructor(data) {
    /** The user's name */
    this.userName = data.username;
    /** The desired password */
    this.password = data.password;
    /** The confirmed password */
    this.confirmPassword = data.confirmPassword;
  }
}

/**
 * The data of a single user
 */
export class UserData {
  constructor(data) {
    /** The user's name */
    this.userName = data.username;
    /** The user's password */
    this.password = data.password;
    /** THe user's email */
    this.email = data.email;
  }
}

/**
 * Exercise 1, 1.5 points
 *
 * @param {String[]|null} data
 * @param {(data,error)=>any} callback
 */
export function generateStats(data, callback) {
  let e = null;
  let d = null;
  try {
    if (data === undefined || data == null || !Array.isArray(data)) {
      throw new Error('Invalid input');
    }
    d = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i] == null) {
        continue;
      }
      if (typeof data[i] !== 'string') {
        throw new Error('Invalid input');
      }
      if (wordExist(d, data[i])) {
        continue;
      }
      d[data[i]] = countWordOccurrences(data, i);
    }
  } catch (error) {
    e = error.message;
  }
  return callback(d, e);
}

function wordExist(array, word) {
  for (let i = 0; i < array.length; i++) {
    if (word === array[i]) {
      return true;
    }
  }
  return false;
}

function countWordOccurrences(array, index) {
  let occurrences = 1;
  for (let i = 0; i < array.length; i++) {
    if (index !== i) {
      if (array[i] == null) {
        continue;
      }
      if (array[index] === array[i]) {
        occurrences++;
      }
    }
  }
  return occurrences;
}

/**
 * Exercise 2, 1.5 points
 *
 * @param {Number} time
 * @param {Array} info
 * @param {(data:Array)=>any} callback
 * @returns
 */
export function callbackPromise(time, info, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(callback(info));
      } catch (error) {
        reject(error);
      }
    }, time);
  }).then((value) => {
    const answer = [];
    for (let i = 0; i < info.length; i++) {
      answer[i] = info[i] + value[i];
    }
    return answer;
  });
}

/**
 * Exercise 3, 1.5 points
 *
 * @param {UserForm} formData The user input data
 * @param {(name:String)=>Promise<Boolean>} userExists Function that takes an user name and
 * returns a promise that states whether the user exists or not.
 */
export function validateForm(formData, userExists) {
  return new Promise((resolve, reject) => {
    if (formData.userName == null) {
      reject('userName cannot be null');
    }
    if (formData.password == null) {
      reject('password cannot be null');
    }
    if (formData.confirmPassword !== formData.password) {
      reject("passwords don't match");
    }
    userExists(formData.userName)
      .then((exists) => {
        if (exists) {
          reject('userName already exists');
        }
        resolve(formData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Exercise 4, 1.5 points
 *
 * @param {()=>Promise<UserData>} getUserData Function that returns a promise with the user form data
 * @param {(data:UserData)=>Promise<Number>} validateData Validates user data and returns
 * a promise with a validation number
 * @param {(data:UserData)=>Promise<String>} saveUserData Stores user data and returns the new record ID
 * @returns {Promise<{userData:UserData,validationCode:Number,userId:String}}
 */
export function registrationProcess(getUserData, validateData, saveUserData) {
  return new Promise((resolve, reject) => {
    getUserData()
      .then((userData) => {
        const validateDataP = validateData(userData);
        return Promise.all([userData, validateDataP]);
      })
      .then(([userData, validationCode]) => {
        const validationCodeP = saveUserData(userData);
        return Promise.all([userData, validationCode, validationCodeP]);
      })
      .then(([userData, validationCode, userId]) => {
        resolve({
          userData: userData,
          validationCode: validationCode,
          userId: userId
        });
      })
      .catch((error) => {
        reject(`REGISTRATION FAILED: ${error}`);
      });
  });
}

/**
 * Exercise 5, 1.5 points
 */
export async function asyncProcess(times, produce, consume) {
  const production = [];
  for (let iteration = 0; iteration < times; iteration++) {
    try {
      production[iteration] = await produce();
    } catch (error) {
      throw new Error(`Error on iteration ${iteration}: ${error.message}`);
    }
  }
  const consumption = [];
  for (let i = 0, iteration = 0; i < production.length; i++) {
    for (let j = 0; j < production[i].length; j++, iteration++) {
      try {
        consumption.push(await consume(production[i][j]));
      } catch (error) {
        throw new Error(`Error on iteration ${iteration}: ${error.message}`);
      }
    }
  }
  return consumption;
}

/**
 * Exercise 6, 1.5 points
 *
 * @param {()=>Promise} produce
 * @param {(data:any)=>Promise} consume
 * @returns
 */
export function backgroundProcess(produce, consume) {
  // Function constants
  const IDLE = 0,
    RUNNING = 1,
    FINISHED = 2,
    INTERVAL_MS = 100;
  /** Production accumulated since the last call to the function result */
  let production = [];
  /** It counts the total amount of items produced */
  let totalProduced = 0;
  /** Current status, needed to control when to stop */
  let status = IDLE;
  /** Keep track of the interval in order to stop it later */
  let id = setInterval(async () => {
    // Change the process status on the first execution
    if (status === IDLE) status = RUNNING;
    // Take the next bundle of products
    const products = await produce();
    // While there are more products, continue consuming
    if (products !== null) {
      for (const product of products) {
        // Send the product to be consumed and wait for the result
        const result = await consume(product);
        // Add to the current queue
        production.push(result);
      }
    } else {
      /**
       * Since this callback is async, setInterval will
       * be executed each INTERVAL_MS even in the case
       * the algorithm takes more time than the interval.
       * Therefore, the first closure that detects a null
       * will stop the process.
       */
      if (id !== null) {
        clearInterval(id);
        id = null;
        status = FINISHED;
      }
    }
  }, INTERVAL_MS);

  /**
   * Return the status function
   */
  return () => {
    // Grab the current production
    const available = production;
    // Calculate the stats
    totalProduced += production.length;
    // Clear the production in each call
    production = [];
    // Return the stats
    return {
      available,
      totalProduced,
      status
    };
  };
}
