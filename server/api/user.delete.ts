import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient() 

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    let user = null
    let error = null

    if(body.id)
        await prisma.users.delete({
            where: {
                id : body.id,
                },
        }).then((res) => {
            user = res
        }).catch((e) => {
            error = e
        })
    
    if (error) return createError({ statusCode: 500, statusMessage: "server error" });
    
    return user
})