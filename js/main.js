// const TOTAL = 1000;
// let dinos = [];
// let obstacles = [];
// let counter = 0;
// let slider;
// let neat;
//
// let config = {
//     model: [
//         {nodeCount: 5, type: "input"},
//         {nodeCount: 2, type: "output", activationfunc: activation.SOFTMAX}
//     ],
//     mutationRate: 0.1,
//     crossoverMethod: crossover.RANDOM,
//     mutationMethod: mutate.RANDOM,
//     populationSize: TOTAL
// };
//
// function setup() {
//     createCanvas(640, 480);
//     slider = createSlider(1, 10, 1);
//     for (let i = 0; i < TOTAL; i++) {
//         dino[i] = new Dino();
//     }
//     neat = new NEAT(config);
// }