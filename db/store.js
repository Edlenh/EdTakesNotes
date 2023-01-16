const util = require("util")
const fs = require("fs")

const uuidv1 = require("uuid/v1")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store{
    read(){
        return readFileAsync("db/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes(){
        return this.read().then(notes=>{
            let parseNotes 
            try{
                parseNotes= [].concat(JSON.parse(notes))
            }catch(error){
                parseNotes = []
            }
            return parseNotes
        })
    }
    addNote(note){
        const {title, text} =note
        if(!title || !text){
            throw new Error("title and text cant be empty")
        }
        const newNote ={title,text,id: uuidv1()}
        return this.getNotes().then(notes=>[...notes,newNote]).then(updatedNote=>this.write(updatedNote)).then(()=>newNote)
    } 
}


module.exports = new Store()