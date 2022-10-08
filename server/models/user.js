const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')
// const { create } = require('./habit')

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.passwordDigest = data.passwordDigest
        this.prevDate = data.prevDate
    }

    // get list of all users
    static get all() {
        return new Promise (async (res, rej) => {
            try {
                const db = await init()
                const usersData = await db.collection('users').find().toArray()
                const users = usersData.map(d => new User({ ...d, id: d._id }))
                res(users);
            } catch (err) {
                console.log(err);
                rej("Error retrieving users")
            }
        })
    }

    // get user by id
    static findById(id) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                let userData = await db.collection('users').find({ _id: ObjectId(id) }).toArray()
                let user = new User({...userData[0], id: userData[0]._id});
                res(user);
            } catch(err) {
                rej('User not found')
            }
        })
    }

    // get user by username
    static findByUsername(username) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ username: username }).toArray();
                let user = new User({...result[0], id: result[0]._id});
                res(user);
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    // create a new user
    static create({ username, password }) {
        return new Promise(async(res, rej) => {
            try {
                const db = await init();
                // get date (could do on client side)
                let today = new Date;
                let currentdate = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;

                let result = await db.collection('users').insertOne({ username, passwordDigest: password, prevDate: currentdate });
                let newUser = new User(result.insertedId);
                res (newUser);
            } catch (err) {
                rej(`Error creating user: ${err}`);
            }
        })
    }

    // updates last login date of a user
    update(newPrevDate) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                const updatedUser = await db.collection('users').updateOne( {_id: ObjectId(this.id) }, {$set: {prevDate: newPrevDate}})
                res(updatedUser);
            } catch(err) {
                rej('User could not be updated')
            }
        })
    }

    // check is username is taken for registration
    static usernameExists(username) {
        return new Promise(async (res, rej) => {
            try {
                const db = await init();
                let result = await db.collection('users').find({ username }).toArray();
                let user = new User({...result[0]});
                let exists = true;
                if (!user.username) {
                    exists = false
                }
                res(exists);
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
    
    // update streaks and refresh habit statuses as appropriate for a user's habits
    updateOnNewDay(currentDate) {

        return new Promise (async (res, rej) => {
            try {
            const db = await init();
                
            let userId = this.id.toString()
            let prevDateAsDate = new Date(this.prevDate)
            let currentDateAsDate = new Date(currentDate)       
            let prevDateInDays = prevDateAsDate.getTime() / (1000 * 3600 * 24);
            let currentDateInDays = currentDateAsDate.getTime() / (1000 * 3600 * 24);
 
            // Update all daily habits
            if ( currentDateInDays > (prevDateInDays + 1)) {
                // If more than one day since login, end all daily streaks
                await db.collection('habits').updateMany( { userId, frequency: 'Daily' }, { $set: { streak: 0}} )
            } else {
                // if one day since login, end streaks for uncompleted daily habits
                await db.collection('habits').updateMany( { userId, completed: false, frequency: 'Daily' }, { $set: { streak: 0}} )
            }
            // set current to 0 and completed to false for all daily habits
            await db.collection('habits').updateMany( { userId, frequency: 'Daily' }, {$set: {current: 0, completed: false }})
            
            // Update all weekly habits
            let prevSundayInDays = prevDateInDays - ((prevDateInDays + 4) % 7)

            if (currentDateInDays >= prevSundayInDays + 7) {
                
                if ( currentDateInDays >= prevSundayInDays + 14) {
                    // If more than two weeks since the previous weekly period started, end all weekly streaks
                    await db.collection('habits').updateMany( { userId, frequency: 'Weekly' }, { $set: { streak: 0}} )
                } else {
                    // if one week since previous weekly period started, end streaks for uncompleted weekly habits
                    await db.collection('habits').updateMany( { userId, completed: false, frequency: 'Weekly' }, { $set: { streak: 0}} )
                }
                // set current to 0 and completed to false for all weekly habits
                await db.collection('habits').updateMany( { userId, frequency: 'Weekly' }, {$set: {current: 0, completed: false }})
            }
            
            // Update all monthly habits
            let prevDateMonth = prevDateAsDate.getMonth()
            let currentDateMonth = currentDateAsDate.getMonth()
            if (currentDateMonth != prevDateMonth) {
                if (((currentDateMonth === prevDateMonth + 1) || (currentDateMonth === prevDateMonth - 11)) && (currentDateInDays < prevDateInDays + 100)) {
                    // if next month after last login, end streaks for uncompleted monthly habits
                    await db.collection('habits').updateMany( { userId, completed: false, frequency: 'Monthly' }, { $set: { streak: 0}} )
                } else {
                    // If missed a month since last login, end all monthly streaks
                    await db.collection('habits').updateMany( { userId, frequency: 'Monthly' }, { $set: { streak: 0}} )
                }
                await db.collection('habits').updateMany( { userId, frequency: 'Monthly' }, {$set: {current: 0, completed: false }})
                // set current to 0 and completed to false for all monthly habits
            }
                
                res('Update on new day complete')
        } catch(err) {
            rej('Could not complete update on new day')
        }
    })

    }


}

module.exports = User;
