const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Habit {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.frequency = data.frequency
        this.goal = data.goal
        this.current = data.current
        this.completed = data.completed
        this.streak = data.streak
        this.userId = data.userId
    }

    // get all habits
    static get all() {
        return new Promise (async (res, rej) => {
            try {
                const db = await init()
                const habitsData = await db.collection('habits').find().toArray()
                const habits = habitsData.map(d => new Habit({ ...d, id: d._id }))
                res(habits);
            } catch (err) {
                console.log(err);
                rej("Error retrieving habits")
            }
        })
    }

    // Find with habit ID
    static findById(id) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').find({ _id: ObjectId(id) }).toArray()
                let habit = new Habit({...habitData[0], id: habitData[0]._id});
                res(habit);
            } catch(err) {
                rej('Habit not found')
            }
        })
    }

    // Find all habits of a user with specific user ID
    static findByUserId(userId) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                let habitsData = await db.collection('habits').find({ userId: userId }).toArray()
                const userHabits = habitsData.map(d => new Habit({ ...d, id: d._id }))
                res(userHabits)
            } catch(err) {
                rej('User habits not found')
            }
        })
    }

    // create a new habit for a user
    static create(title, frequency, goal, userId) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').insertOne({ title, frequency, goal, current: 0, completed: false, streak: 0, userId  });
                let newHabit = new Habit(habitData.insertedId);
                res(newHabit);
            } catch (err) {
                rej('Habit could not be created')
            }
        })
    }

    // increment current times habit has been completed and adjust statuses
    update(command) {
        return new Promise (async (res, rej) => {
            try {
                const db = await init();
                
                if ((command === 1) && (this.current === this.goal - 1)) {
                        await db.collection('habits').updateOne( {_id: ObjectId(this.id) }, {$set: {completed: true}, $inc: {streak: 1}})
                        
                } else if ((command === -1) && (this.completed === true)) {
                    await db.collection('habits').updateOne( {_id: ObjectId(this.id) }, {$set: {completed: false}, $inc: {streak: -1}})
                }
                        
                const updatedHabit = await db.collection('habits').updateOne( {_id: ObjectId(this.id) }, {$inc: {current: command}})
                    
                res(updatedHabit);
                
            } catch(err) {
                rej('Habit could not be updated')
            }
        })
    }

    // delete an existing habit
    destroy() {
        return new Promise (async (res, rej) => {
            try{
                const db = await init();
                await db.collection('habits').deleteOne({_id: ObjectId(this.id)})
                res('Habit was deleted')
            } catch(err) {
                rej('Habit could not be deleted')
            }
        })
    }
}

module.exports = Habit;
