/**
 * User input readed from a web form
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
  
}

/**
 * Exercise 3, 1.5 points
 * 
 * @param {FormData} formData The user input data
 * @param {(name:String)=>Promise<Boolean>} userExists Function that takes an user name and
 * returns a promise that states whether the user exists or not.
 * 
 */
export function validateForm(formData, userExists) {

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

}

/**
 * Exercise 5, 1.5 points
 */
export async function asyncProcess(times, produce, consume) {

}
/**
 * Exercise 6, 1.5 points
 * 
 * @param {()=>Promise} produce 
 * @param {(data:any)=>Promise} consume
 * @returns 
 */
export function backgroundProcess(produce, consume) {

}