/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface ReturnedData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number ,
  ratingDescription: string,
  target: number,
  average: number | string
}
// const reducerFunction = (arg: Array<number>) => {
//     let value =  arg.reduce((acc, unit) => {
//         acc += unit
//     })
// }
interface proccedArg {
    argValue: number[],
}
const validatingArguments = (args: Array<string>): proccedArg  => {
    const mainArg = args.slice(2);
    if(mainArg.find(unit => isNaN(Number(unit)))){
        throw new Error('non Numerical element among the arguments');
    }
    return {
        argValue: mainArg.map(unit => Number(unit)),
    };
};

export const calculateExercise = (args: number[], target: number): ReturnedData => {
    let rating = 0;
    let ratingdescription = '';
    const defaultTrainingHours = 5 * args.length;
    const periodLength = args.length;
    const trainingDays = args.filter(unit => unit > 0).length;
   
    const totalTrainingHour = args.reduce((acc, num): number => {
        acc += num;
        return acc;
    }, 0);

    const trainingAverage = totalTrainingHour / periodLength;

    const success = trainingAverage >= target;
    // console.log(totalTrainingHour);
    if (totalTrainingHour === defaultTrainingHours){
        rating = 3;
        ratingdescription =  `bravo!!! you did excellently well.. your training Hour: ${totalTrainingHour}hrs`;
    }
    else if (totalTrainingHour >= 15 && totalTrainingHour < 25){
        rating = 2;
        ratingdescription = `not too bad, but you could do better.. your training Hour: ${totalTrainingHour}hrs`;
    }
    else if (totalTrainingHour < 15){
        rating = 1;
        ratingdescription = ` Very bad, You need to be more consistent in the coming week.. your training Hour: ${totalTrainingHour}hrs`;
    }
    
    
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription: ratingdescription,
        target,
        average: trainingAverage
     };
};


try {
    const {argValue} = validatingArguments(process.argv);
    console.log(calculateExercise(argValue, 2));
}catch(error: any){
    console.log(error.message);
}