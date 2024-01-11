var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var app = express();

app.use(express.json());

const PORT = 3000;


const datacollector = require('../data/datacollector');
datacollector.init();


/* POST users listing. */
app.post('/bmicalculator', async (req, res)=> {
 
  
  const userInDb = await prisma.user.create({
    data: {
      name: user.name,
      age: user.age,
      gender: user.gender,
      weight: user.weight,
      height: user.height,
    },
  });
  res.send(userInDb);
});

app.post("/bmicalculator", async (req, res)=> {

    const {weight, height} = req.body;
    const bmi = calculateBmi(weight / (height*height));
       
    const BmiRecord = await Prisma.bmiRecord.creat ({
      data: {height, weight, bmi}
    });

    
	res.json(bmiRecord);
  });


app.get("/bmicalculator", (req, res)=> {
	res.send("Your BMI: " + bmi);

});

app.get("/bmicalculator", async (req, res) =>{
	const bmiRecords = await Prisma.BmiRecord.findMany();

	res.json(bmiRecords);
});


app.listen(PORT, () =>{
  console.log("Server is running on port 3000")
});

module.exports = router;
