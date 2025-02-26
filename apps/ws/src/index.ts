import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import prismaClient from "@repo/db/client"


const wss = new WebSocketServer({port:8080})

wss.on('connection', (ws, request) => {

    try {
        const url = request.url
        const params = new URLSearchParams(url?.split("?")[1])
        const token = params.get("token") || ""
        const userId = jwt.verify(token, "123456789")
        if(!userId){
            ws.close()
        }
        console.log("User connected!")
        ws.on('message', async(data) => {
            try {
                const data = await prismaClient.user.findMany();
                ws.send(JSON.stringify(data));
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
})