import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient() 

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let user=null
    
    if(body.name)
        await prisma.users.create({
            data: {
                name: body.name,
                email:body.email
        },
        }).then((res) => {
            user = res;    
    }).catch((e) => {
        console.error(e)
    })
    
    return {
        user:user
    }

})