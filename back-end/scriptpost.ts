import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   })
//   console.log(user)

 // const users = await prisma.user.findMany()
  //console.log(users)
  
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const resPost = await response.json();
   // console.log(resPost);

    resPost.forEach(async function (value:any) {
        //console.log(value);
        const user = await prisma.post.create({
            data :{
                id:value.id,
                title:value.title,
                body: value.body,
                userId: value.userId
            }
        });
        console.log(user)
      }); 
      


// const usersWithPosts = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   })
//   console.dir(usersWithPosts, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })