interface BmiValues {
    height: number,
    weight: number
}
const validatingArgument = (args: Array<string>): BmiValues => {
    if (args.length > 4) throw new Error('too many arguments');
    if (args.length < 4) throw new Error('not enough argument supplied');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('invalid argument types!!');
    }
};


export const calculateBmi = (height: number, weight: number): string  => {
    const convertedHeight = height / 100 ;
    const bmi = weight / (convertedHeight * convertedHeight);
    console.log(bmi);
    if ( bmi < 18.5 ){
        return `UnderWeight(below normal weight)`;
    }
    else if(bmi >= 18.5 && bmi < 25){
        return `Normal (healthy weight)`;
    }
    else if( bmi >= 25 && bmi < 30){
        return `Overweight`;
    }
    else if (bmi >= 30 && bmi < 35){
        return `Class I Obesity`;
    }
    else if(bmi >= 35 && bmi <= 40){
        return `Class II Obesity`;
    }
    else {
        return `you need urgent medical attention`;
    }

};

// try {
//     // const {height, weight} = validatingArgument(process.argv);
//     console.log(calculateBmi(height, weight));
// }catch(error){
//     console.log(error.message);
// }

module.exports = {
    calculateBmi,
    validatingArgument
};