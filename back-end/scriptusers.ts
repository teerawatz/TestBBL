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
  
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const resUser = await response.json();
    //console.log(resUser);

    resUser.forEach(async function (value:any) {
        //console.log(value);
        const user = await prisma.user.create({
            data :{
                id:value.id,
                name:value.name,
                username: value.username,
                email: value.email,
                address: value.address,
                phone: value.phone,
                website: value.website,
                company: value.company
            }
        });
        console.log(user)
      }); 
      

// const user = await prisma.user.create({
//     data: [
//         {
//           name: "Leanne Graham",
//           username: "Bret",
//           email: "Sincere@april.biz",
//           address: {
//             street: "Kulas Light",
//             suite: "Apt. 556",
//             city: "Gwenborough",
//             zipcode: "92998-3874",
//             geo: {
//               lat: "-37.3159",
//               lng: "81.1496"
//             }
//           },
//           phone: "1-770-736-8031 x56442",
//           website: "hildegard.org",
//           company: {
//             name: "Romaguera-Crona",
//             catchPhrase: "Multi-layered client-server neural-net",
//             bs: "harness real-time e-markets"
//           }
//         },
//         {
//           name: "Ervin Howell",
//           username: "Antonette",
//           email: "Shanna@melissa.tv",
//           address: {
//             street: "Victor Plains",
//             suite: "Suite 879",
//             city: "Wisokyburgh",
//             zipcode: "90566-7771",
//             geo: {
//               lat: "-43.9509",
//               lng: "-34.4618"
//             }
//           },
//           phone: "010-692-6593 x09125",
//           website: "anastasia.net",
//           company: {
//             name: "Deckow-Crist",
//             catchPhrase: "Proactive didactic contingency",
//             bs: "synergize scalable supply-chains"
//           }
//         }
//       ],
//   })
//   console.log(user)

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
