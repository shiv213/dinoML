import numpy as np
from numpy.random import randint
from random import random as rnd
from random import gauss, randrange
import math


class Population:
    def __init__(self, p, m, num):
        self.population = []
        self.matingpool = []
        self.generations = 0
        self.finished = False
        self.target = p
        self.mutationrate = m
        self.perfectScore = 1
        self.best = ""
        for x in range(num):
            self.population.append(DNA(len(self.target)))
        self.matingpool = []
        self.calcfitness()

    def calcfitness(self):
        for x in range(len(self.population)):
            self.population[x].calcfitness(self.target)

    def naturalselection(self):
        self.matingpool = []
        maxfitness = 0
        for x in range(len(self.population)):
            if self.population[x].fitness > maxfitness:
                maxfitness = self.population[x].fitness

        for y in range(len(self.population)):
            # fitness = map(self.population[y].fitness, 0, maxfitness, 0, 1)
            fitness = (self.population[y].fitness / maxfitness) * 1

            n = math.floor(fitness * 100)
            for x in range(len(n)):
                self.matingpool.append(self.population[y])

    def generate(self):
        for x in range(len(self.population)):
            a = math.floor(randrange(len(self.matingpool)))
            b = math.floor(randrange(len(self.matingpool)))
            partnera = self.matingpool[a]
            partnerb = self.matingpool[b]
            child = partnera.crossover(partnerb)
            child.mutate(self.mutationrate)
            self.population[x] = child
        self.generations += 1

    def getbest(self):
        return self.best

    def evaluate(self):
        worldrecord = 0.0
        index = 0
        for x in range(len(self.population)):
            if self.population[x].fitness > worldrecord:
                index = x;
                worldrecord = self.population[x].fitness
        self.best = self.population[index].getPhrase()
        if worldrecord == self.perfectScore:
            self.finished = True

    def isfinished(self):
        return self.finished

    def getgenerations(self):
        return self.generations

    def getaveragefitness(self):
        total = 0
        for x in range(len(self.population)):
            total += self.population[x].fitness
        return total / len(self.population)

    # def allphrases(self):
    #     everything = ""
    #     displaylimit = min


def newchar():
    c = math.floor(randrange(63, 122))
    if c == 63:
        c = 32
    if c == 64:
        c = 46

    return str(c)


class DNA:
    def __init__(self, num):
        self.genes = []
        self.fitness = 0
        for x in range(num):
            self.genes.append(newchar())

    def getphrase(self):
        return self.genes.join("")

    def calcfitness(self, target):
        score = 0
        for x in range(len(self.genes)):
            if self.genes[x] == target[x]:
                score += 1
        self.fitness = score / len(target)

    def crossover(self, partner):
        child = DNA(len(self.genes))
        midpoint = math.floor(randrange(len(self.genes)))
        for x in range(len(self.genes)):
            if x > midpoint:
                child.genes[x] = self.genes[x]
            else:
                child.genes[x] = partner.genes[x]
        return child

    def mutate(self, mutationratex):
        for x in range(len(self.genes)):
            if randrange(1) < mutationratex:
                self.genes[x] = newchar()


def main():
    print("Hello World!")

    target = "To be or not to be."
    popmax = 200
    mutationrate = 0.01

    population = Population(target, mutationrate, popmax)
    population.naturalselection()
    population.generate()
    population.calcfitness()

    population.evaluate()


if __name__ == "__main__":
    main()

# print(p1.name)
# print(p1.age)
