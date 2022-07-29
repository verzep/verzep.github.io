---
layout: post
title: On Forecasting
tags: dynamical_systems
category: dynamical_systems
---

Predicting the future has always been a crucial goal for humans. 
In a certain sense, it can be said that it is the _fundamental_ task of science: while it is basically always possible to explain past observations, well-grounded scientific theories must be able to predict future outcomes of experiments.
Otherwise, they are rejected (or, at least, questioned).

The study of phenomena that change in time goes under the name of _Dynamical Systems theory_. 
Even if the origin of this field may be dated back to Isaac Newton and his study of mechanics, the foundation of the modern theory of dynamical systems is  usually attributed to [Henri Poincaré](https://en.wikipedia.org/wiki/Henri_Poincar%C3%A9).
He laid down the basis of the local and global analysis of nonlinear differential equations, introducing concepts like stable and unstable manifolds, and using a geometric approach to tackle these problems.
The idea underlying this approach is that reality obeys some unchanging laws that can be discovered and described using the language of mathematics.
Hence, with a perfect knowledge of the equations governing a natural system, its future behaviour can be perfectly forecast.
This faith in the predicting role of mathematical modelization was evocatively exposed in $1814$ by Pierre-Simon Laplace in his book _Essai philosophique sur les probabilités_ (Philosophical Essay on Probability):


> We must consider the present state of Universe as the effect of its past state and the cause of its future state. An intelligence that would know all forces of nature and the respective situation of all its elements, if furthermore it was large enough to be able to analyze all these data, would embrace in the same expression the motions of the largest bodies of Universe as well as those of the slightest atom: nothing would be uncertain for this intelligence, all future and all past would be as known as present.


Difficulties related to this view were already evident to Poincaré, who realized that some problems (like the infamous [three-body problem](https://en.wikipedia.org/wiki/Three-body_problem)) were _impossible_ to solve, in the sense of obtaining precise formulas for the motion of the objects under study.
But  an even more radical form of uncertainty was discovered. 
Leaving aside the stochastic nature of quantum phenomena, also fully-deterministic systems may display an inherent unpredictability, which goes under the name of _deterministic chaos_. 
The findings of Edward Lorenz are usually considered the beginning of the study of chaotic phenomena. 
He talked about his discovery in an interview:
    

>I wanted to examine some of the solutions in more detail. I had a small computer in my office then so I typed in some of the intermediate conditions which the computer had printed out as new initial conditions to start another computation and then went out for awhile. When I came back I found that the solution was not the same as the one I had before. The computer was behaving differently. I suspected computer trouble at first. But I soon found that the reason was that the numbers I had typed in were not the same as the original ones. These were rounded off numbers. And the small difference between something retained to six decimal places and rounded off to three had amplified in the course of two months of simulated weather until the difference was as big as the signal itself. And to me this implied that if the real atmosphere behaved in this method then we simply couldn’t make forecasts two months ahead. The small errors in observation would amplify until they became large.
 
    
The discovery that a 3-dimensional dynamical system displays _sensitive dependence to initial conditions_ undermined the belief about the predictability of systems, even when they are modeled to be deterministic and low-dimensional.
Chaos theory has greatly developed since then due to theoretical studies and the numerical simulations made possible by the improvement of computational power.[[^1]] 
But yet, the unpredictability is still at the core of these systems. 
This means that even when having a perfect model of a phenomenon, an accurate prediction of its future state might be impossible.
    
Yet, the key-role of models in today science is far from being obsolete. 
 In fact, the discovery that even simple models can display complex behaviors led researchers to provide simple explanations to complicated phenomena. 
Scientists in the past century have been able to describe behaviors which appeared heterogeneous and intricate simply by starting from few assumptions. Particle physics, neuroscience, fluidodynamics and, more recently, complex networks are just some notable examples of this trend.
Basically any scientific field involves the creation of a (mathematical) model encoding the fundamental feature of a natural (or artificial) phenomenon. 
    
But for many of the most challenging applications in science exact models are notably hard to produce due to the enormous number of variables involved and the complexity of their interactions.
Yet, in recent years the incredible amount of available data has driven researchers to study these complex systems by using machine learning techniques. 
These techniques are valuable in settings where no model can be formulated explicitly.
This approach led to incredible achievements in fields like image classification, text and speech processing, and autonomous driving, just to name a few. 
Machine learning uses the concept of  _model_ in a novel sense: instead of formulating a mathematical model that aims at encoding the fundamental feature of the object under study, the models used in machine learning are constructed to learn a specific behavior, which would mimic the one of the system of interest. 
This might seem to be something alien to the scientific method: instead of understanding the rules governing reality, one simply tries to imitate its behavior.
This issue generates some vibrant discussions among experts, not only from an epistemological point of view, but also regarding the usage of machine learning in real word tasks, where some guarantees might be needed.


[^1]:Lorenz's electronic computer, the Royal McBee, was able to perform only sixty (60!) multiplications a second.}
    
