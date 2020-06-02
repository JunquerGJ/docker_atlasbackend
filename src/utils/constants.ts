import * as fs from 'fs';



let CRYPTOCERT = fs.readFileSync('/run/secrets/CRYPTOCERT').toString()
let CRYPTOKEY = fs.readFileSync('/run/secrets/CRYPTOKEY').toString()
let DATABASE_URL = fs.readFileSync('/run/secrets/DATABASE_URL').toString()
let JWT_SECRET = fs.readFileSync('/run/secrets/JWT_SECRET').toString()
let PORT = fs.readFileSync('/run/secrets/PORT').toString()
let PW_ALGORITHM = fs.readFileSync('/run/secrets/PW_ALGORITHM').toString()
let PW_KEYGENERATOR = fs.readFileSync('/run/secrets/PW_KEYGENERATOR').toString()
let TOKEN_DURATION = fs.readFileSync('/run/secrets/TOKEN_DURATION').toString()
let dbName = fs.readFileSync('/run/secrets/dbName').toString()
let dbUser = fs.readFileSync('/run/secrets/dbUser').toString()
let dbUserPass = fs.readFileSync('/run/secrets/dbUserPass').toString()




export {
    CRYPTOCERT,
    CRYPTOKEY,
    DATABASE_URL,
    JWT_SECRET,
    PORT,
    PW_ALGORITHM,
    PW_KEYGENERATOR,
    TOKEN_DURATION,
    dbName,
    dbUser,
    dbUserPass
}
