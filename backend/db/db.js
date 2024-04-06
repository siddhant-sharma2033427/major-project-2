// const connstring = "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/RawData"
import mongoose from 'mongoose';
const String= "mongodb+srv://user:User@major-project.8kkxvv2.mongodb.net/RawData"
const Connection = async ()=>{
    try{
        await mongoose.connect(String)
        console.log("DB_connected");
    }catch(error){
        console.log("some error occured while connecting",error);
    }
}

export default Connection