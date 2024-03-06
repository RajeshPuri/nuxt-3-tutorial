import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient() 

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const id = body.id
    const name = body.name
    const email = body.email

    if (!id) return createError({ statusCode: 400, statusMessage: "Missing ID" });


    let user = null

    if(id)
        user = await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email
            },
        })

    return user
})