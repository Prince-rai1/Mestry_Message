import mongoose from "mongoose";

type ConnectionObject = {
     isConnected?:number
}
const connection : ConnectionObject = {}

export async function dbconnect(): Promise<void> {

    if(connection.isConnected){

        console.log("Database already Connected")

        return
        
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI as string)

        connection.isConnected = db.connections[0].readyState

        console.log("Data base connected successfully")

    } 
    catch (error : any) {

        console.log("Data Base connection Failed")

        console.log(error)

        process.exit()

    }

}