
import express, { Application, Request, Response } from 'express';
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client';
//import cors from "cors";
const cors = require('cors');

const prisma = new PrismaClient()

const app: Application = express();

const PORT: number = 3000;
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

//get all resource
app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    
  })
  res.json(users)
})

//Get a specific user
app.get("/users/:id", async (req: Request, res: Response) => {
  //var userid: number =  parseInt(req.params.id);
  const users = await prisma.user.findUnique({
    where: {
      id : Number(req.params.id),
    },
  })
  res.json(users);
});

//create resource
app.post("/users", async (req: Request, res: Response) => {
  // console.log(req.body);
  // res.json(req.body);
  const user = await prisma.user.create({
    data :{
        name:req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: {
          street: req.body.street,
          suite: req.body.suite,
          city: req.body.city,
          zipcode: req.body.zipcode,
          geo: {
            lat: req.body.lat,
            lng: req.body.lng
              
          }
        },
        phone: req.body.phone,
        website: req.body.website,
        company: {
            name: req.body.companyName,
            catchPhrase: req.body.catchPhrase,
            bs: req.body.bs
        }
    }
  });
  res.json(user);
}); 

app.put("/users/:id", async (req: Request, res: Response) => {
  //console.log(req.body);

  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(user);
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  //console.log(req.body);

  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(user);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  //console.log(req.body);

  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  res.json(deleteUser);
});

//Filter users
app.get("/userFilter", async (req: Request, res: Response) => {
  const id = req.query.userId;
  const users = await prisma.user.findMany({
    where: {
      id : Number(id),
    },
  })
  res.json(users);
 
});

//get all posts
app.get('/posts', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    
  })
  res.json(posts)
})

//Get a specific post
app.get("/posts/:id", async (req: Request, res: Response) => {
  //var userid: number =  parseInt(req.params.id);
  const posts = await prisma.post.findUnique({
    include: {
      user: true,
    },
    where: {
      id : Number(req.params.id),
    },
  })
  res.json(posts);
});

//Filter posts
app.get("/postFilter", async (req: Request, res: Response) => {
  const id = req.query.userId;
  const posts = await prisma.post.findMany({
    where: {
      userId : Number(id),
    },
  })
  res.json(posts);
 
});

//create resource
app.post("/posts", async (req: Request, res: Response) => {
  //const reqjson = JSON.stringify(req.body);
  //console.log(req.body); 
  const posts = await prisma.post.create({
    data :{
        userId: Number(req.body.userId),
        title: req.body.title,
        body: req.body.body
    }
  });
  res.status(200).json(posts); 
}); 

app.put("/posts/:id", async (req: Request, res: Response) => {
  //console.log(req.body);

  const posts = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(posts);
});

app.patch("/posts/:id", async (req: Request, res: Response) => {
  //console.log(req.body);

  const posts = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  })
  res.json(posts);
});

app.delete("/posts/:id", async (req: Request, res: Response) => {
  //console.log(req.body);
  const deletePost = await prisma.post.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  res.json(deletePost);
});

app.get('/get_users', (req: Request, res: Response) => {
  
  //res.send(json)
  //res.send('Express + TypeScript Server'); 
  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => console.log(json));
});

app.get('/create_posts', (req: Request, res: Response) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});