const mongoose = require('mongoose');
const express = require('express')
const app = express()
const morgan = require('morgan')
const {urlencoded, json} = require('body-parser')
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        requireed:true,
        unique: true
    },
    body:{
        type:String,
        minlength: 10
    }
})

const Note = mongoose.model('note',noteSchema)

app.use(morgan('dev'))
app.use(urlencoded({extended:true}))
app.use(json())

app.get('/note',async (req,res)=> {
    const notes = await Note.find({})
    .lean()
    .exec()
    res.status(200).json(notes.toJSON())
})
app.post('/note', async (req,res) => {
    const noteToBeCreated = req.body
    const note = await Note.create(noteToBeCreated)
    res,status(201).json(note)
})

const connect = () =>{
    return mongoose.connect('mongodb://localhost:27017/School');
}
/*const student = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    favFoods:[{type:String}],
    info:{
        school:{
            type:String
        },
        rollNo:{
            type:Number
        }
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'school'
    }
},{timestamps:true})*/

/*const school = new mongoose.Schema({
    district:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'district'
    },
    name:{
        type:String,
        unique:false
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{type: String}]

})

school.index({
    district:1,
    name:1
})

school.post('save', function(){
    console.log('jatin watts')
})
school.virtual('staffCount')
.get(function(){
    console.log('in virtual')
    return this.staff.length
})

const School = mongoose.model('school',school)
const Student = mongoose.model('student',student) */

connect()
    .then( async connection => {
        app.listen(5000)
        console.log('app is runnning')
       // const mySchool = await School.create({
         //   name:'my school',
          //  staff:['v','b','g']
        //})
        // console.log(mySchool)
       /* const schoolConfig  = {
            name:"mlk elementary",
            openSince:2009,
            students: 1000,
            isGreat: true,
            staff:['v','b','g']
        }
        const school2  = {
            name:"Good Shepherd Public School",
            openSince:1980,
            students: 600,
            isGreat: true,
            staff:['v','b','g']
        }
        const school = await School.create([schoolConfig,school2])
        const match = await School.find({
            // $in:{staff:['v','b','g']}
            name:"mlk elementary"
        })
        .sort({openSince: -1})
        .limit(2)
        .exec()
        console.log(match)
       // const school = await School.findByIdAndUpdate(
        //    {name: 'mlk elementary'},
         //   {name: 'mlk elementary'},
          //  {upsert:true,new: true}
          //  )
       // const school = await School.findOneAndUpdate({name:'Good Shepherd Public School'},{name:'Good Shepherd Public School'},{upsert:true,new:true})
       // const student = await Student.create({firstName: 'Jatin', school: school._id})

        //const match = await Student.findById(student.id)
       // .populate('school')
        //.exec()
        //console.log(match)*/
    })
    .catch(e=> console.error(e));
