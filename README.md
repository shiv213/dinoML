# DinoML Planning

#### Purpose
make dino learn to jumpy jump over cactus and under birdies using genetic evolution

--- 

## Open Questions
do we want binary controls (simple) or variation in length of jump, do we want to also have arrow keys for initial impl or save for later
will color change matter/how are we getting our data? 
and what data do we need
will we store progress somewhere, or will it start from scratch every run.
what defines a gene and its expression in our context
will we render all dinos in each generation?

## Controls (Button Press)
- Big jump
- Little jump
- Duck

## Inputs
- Current speed
- Distance to next obstacle
- Width of obstacle
- Height of obstacle
- Player height
- Bird height
- Distance between closest obstacle and 2nd closest obstacles

Fitness is determined by current score

-----

### Thoughts (14 March 2020, 2:30 PM)

Right now, the code feels really messy, unorganized, and hard to reason about. 
It is making my brain hurt. Lets instead properly reason about the code, what we want it to do and how we are going to get there.

#### Current Architecture of Dino Game (Unmodified)

There are few different actors, one of them being the dino. There is one dino per game. 
The game is stored in the p5 instance.   
