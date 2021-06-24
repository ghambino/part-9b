/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

app.use(express.json());


const name = 'abdulwahab abbas';

app.get('/hello', (_req, res) => {
    res.send(`Hello Full-Stack ${name}`);
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (height == null || weight == null){
        res.status(400).json({error: "missing parameters"});
    }

    if(isNaN(Number(height)) || isNaN(Number(weight))){
        res.status(400).json({error: "malformatted parameters"});
    }

    const bmiOutput: string = calculateBmi(height, weight);

    res.status(200)
    .json({
         "weight": weight,
        "height": height,
        "bmi": bmiOutput
    });
});

app.post('/exercise', (req, res) => {
    const { daily_exercises, target } = req.body;
     if(!daily_exercises || !target){
         res.status(400).json({error: "missing argument"});
     }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(daily_exercises.find((unit: any) => isNaN(Number(unit)))){
        res.status(400).json({error: "malformatted parameter"});
    }

    const result = calculateExercise(daily_exercises, target);

    res.status(200).json(result);

});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});