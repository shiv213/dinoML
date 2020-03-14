import Dino from "./game_lib/actors/Dino";

const TOTAL = 5;
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

neat = new NEAT(config);

function updateNeuralNet(state) {
    console.log(state);
    for (let i = 0; i < TOTAL; i++) {
        neat.setInputs(state.dinos[i].inputs(state), i);
    }
    neat.feedForward();
    let decisions = neat.getDecisions();
    for (let i = 0; i < TOTAL; i++) {
        if (decisions[i] === 1) {
            state.dinos[i].jump();
        }
    }
    if (state.gameOver) {
        state.score = 0;
        state.level = 0;
        for (let i = 0; i < TOTAL; i++) {
            neat.setFitness(state.dinos[i].score, i);
            state.dinos[i] = new Dino(p5.height);
        }
        neat.doGen();
    }
}