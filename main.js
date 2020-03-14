const TOTAL = 20;
let neat;

let config = {
    model: [
        {nodeCount: 6, type: "input"},
        {nodeCount: 3, type: "output", activationfunc: activation.SOFTMAX}
    ],
    mutationRate: 0.1,
    crossoverMethod: crossover.RANDOM,
    mutationMethod: mutate.RANDOM,
    populationSize: TOTAL
};

neat = new NEAT(config);

function updateNeuralNet(state) {
    // console.log(state);
    for (let i = 0; i < TOTAL; i++) {
        neat.setInputs(state.dinos[i].inputs(state), i);
    }
    neat.feedForward();
    let decisions = neat.getDecisions();
    // console.log(decisions);
    for (let i = 0; i < TOTAL; i++) {
        if (decisions[i] === 1) {
            state.dinos[i].jump();
        } else if (decisions[i] === 2) {
            state.dinos[i].duck(true);
        }
    }
    document.getElementById("genNum").innerText = neat.getGen();
    document.getElementById("aliveNum").innerText = state.alive;
}