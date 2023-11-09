# TestBBL
Setup Test

1.Install nodejs latest version and docker

2.Clone project
```
git clone https://github.com/teerawatz/TestBBL.git
```

3.Setup backend
```
cd back-end
npm install
npm install nodemon
```

4.Create docker mysql
```
docker pull mysql
docker run --name=con-sql -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=testbbl -p 3306:3306 -d mysql
```

5.Install Prisma
```
npx tsc --init
npm install prisma --save-dev
```
migrate database from model
```
npx prisma migrate dev --name init
```

6.Run script for insert users and posts data to database
```
npx ts-node scriptusers.ts
npx ts-node scriptpost.ts
```
start back-end server
```
npm run dev
```

7.Setup font-end 
```
cd font-end
npm install
npm run dev
```
font-end server run at http://localhost:5173/
