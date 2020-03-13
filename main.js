const TOTAL = 1000;
let dinos = [];
let obstacles = [];
let counter = 0;
let neat;

let config = {
    model: [
        {nodeCount: 5, type: "input"},
        {nodeCount: 2, type: "output", activationfunc: activation.SOFTMAX}
    ],
    mutationRate: 0.1,
    crossoverMethod: crossover.RANDOM,
    mutationMethod: mutate.RANDOM,
    populationSize: TOTAL
};

function setup() {
    neat = new NEAT(config);
}

function updateNeuralNet(state) {
    console.log(state);
}