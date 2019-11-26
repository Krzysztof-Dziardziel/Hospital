/*
Homework:
X Doctors, Y Nurses, X+Y Patients;
12 days;
Every day another X or Y{
    healthBar: [30, 50] random,
    disease: amountOfPoints [1, 6],
    card: sign by X or Y assigned every day,
    beSick(){
        healthBar -= this.disease;
    }
};
Xs and Ys have special healing abilities:
X: [0, 5]
Y: [-2, 3],

Who has IMPROVED the most after 12 days.




WEBPACK
*/
//Set X+Y value
n = 12;
x = n - Math.floor(Math.random()*(n+1));
y = n - x;


class patient{
    constructor (pID){
        this.pID = pID;
        this.lifeLength = 0;
        this.healthBar = Math.floor(Math.random() * 21) + 30;
        this.startingHealth = this.healthBar;
        this.disease = Math.floor(Math.random() * 6) + 1;
        this.card = []
        this.card.push(this.healthBar);
    }
    beSick(){
        this.healthBar -= this.disease;
        this.addToCard(this.healthBar);
    }
    addToCard(health){
        this.card.push(health);
    }
    revive(addHealth){
        this.healthBar += addHealth;
    }
}


class doctor{
    constructor(eID){
        this.eID = 'd' + eID;
        this.healing = Math.floor(Math.random()*6);
        this.patient = 'none';
    }
}
class nurse{
    constructor(eID){
        this.eID = 'n' + eID;
        this.healing = Math.floor(Math.random()*6) - 2;
        this.patient = 'none';
    }
}

//Create list of patients and employees
patients = [];
doctors = [];
nurses = [];

//Create patients, nurses & doctors
for (var i = 0; i < n; i++){
    patients[i] = new patient (i);
}
for (var i = 0; i < x; i++){
    doctors[i] = new doctor (i);
}
for (var i = 0; i < y; i++){
    nurses[i] = new nurse (i);
}

//console.log(patients);
console.log(`Doctors: ${x}, Nurses: ${y}, Patients: ${n}`);
patientsNums = []
for (var i = 0; i < patients.length; i++){
    patientsNums.push(patients[i].pID);
}
doctorsNums = []
for (var i = 0; i < doctors.length; i++){
    doctorsNums.push(doctors[i].eID);
}
nursesNums = []
for (var i = 0; i < nurses.length; i++){
    nursesNums.push(nurses[i].eID);
}
//console.log(patientsNums);
//New day begins


//Durstenfeld shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
for(var i = 0; i < 11; i++){
freeEmployees = doctors.concat(nurses);
shuffleArray(freeEmployees);
patients.forEach(function(patient){
//    console.log(`Health of patient ${patient.pID}: ${patient.healthBar}`);
    patient.revive(freeEmployees[0].healing);
//    console.log(`Healed by ${freeEmployees[0].healing} points: ${patient.healthBar}`);
    freeEmployees.shift();
    patient.beSick();
//    console.log(`After ${patient.lifeLength + 1} day: ${patient.healthBar}`)
})}
a = -Number.MAX_SAFE_INTEGER;
patients.forEach(function(patient, index){

    if (patient.card[11] - patient.card[0] > a){
        a = patient.card[11] - patient.card[0];
        b = index;
    }
})
console.log(`Biggest difference of ${a} HP. Occured for patient pID=${b}`);


