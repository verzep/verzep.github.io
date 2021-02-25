---
layout: post
title: Dynamical Systems
tags: dynamical_systems, maps
category: dynamical_systems
---

>An intellect which at a certain moment would know all forces that set nature in motion, and all positions of all items of which nature is composed, if this intellect were also vast enough to submit these data to analysis, it would embrace in a single formula the movements of the greatest bodies of the universe and those of the tiniest atom; for such an intellect nothing would be uncertain and the future just like the past would be present before its eyes.  
> 
> — Pierre Simon Laplace

In this first post I'll simply be discussing some basic aspects of my field of study, which lies at the intersection of Dynamical Systems (DS) and Machine Learning. The scope of this post (and presumably, the following ones) is two-fold: on one hand, it will be used to develop the notation that I'm going to use through the blog posts. 
On the other hand, it'll be nice way to familiarize with markdown and the blog format, learning the technical aspects and improving scientific writing.

![]({{ site.url }}/images/2021-02-18/trajectory.jpg)



I'm well aware of the enormous amount of material concerning this topic which can be found in books and on the web, but I'm willing to address practictioners of one of this two fields (ML or DS) which aims at deepening their knwoledge about the other one. It will also give me chance to give my ''vision'' of the concepts I'm discussing, in a way which does not usually fit in perr-reviewed papers.
Being a forme phisics student, I will tend to neglect much of the mathematical details (where the devil lies) and to present all the material in a ''intuitive'' way, the focusing on the ''physical'' implications of the concepts I'm discussing. The interested reader may refer to specific (i.e., written by mathematicians) contents, which I will sometimes metion.


## Discrete dynamical systems



Let's start by introducing the basic notions concerning dynamical systems.
Dynamical systems can be divided in __discrete__-time and __continuos__-time: much of the theory will hold for both kind of systems, but there are also some differences which - sometimes - are insidious. 
From now on, when referring to discrete (continuos) systems I will always mean that the **time** is discrete (continuos): the *space* (i.e., where this systems ''live'') can take various forms and I will discuss them when (and if) needed. Most of the time, it will just be a continuos space, subset of 
$$ \mathbb{R}^n $$.

As a former physicist, I tend to consider discrete systems as *discretized* version of continuos one: in fact, when I was first introduced to the topic, the professor started with the continuos case. 
Yet, I believe that it is easier to present the discrete case first, as it allows one to introduce fewer concepts when discussing the main ideas.

In particular, we only need a *space* $$X$$ and a *map* $$M: X \to X$$. Notably, we __do not__ need an explicit definition of what *time* is).
Then, for $$x \in X$$ we are interested in studying:

$$
y = M(x)
$$

Note that, since $$f$$ maps $$X$$ into itself, $$y \in X$$.
This allows one to *iterate* (i.e., apply multiple time) $$M$$, as in:

$$
z = M^2(x) = M(M(x)) = M(y)
$$

so that, for a generic starting point $$x_0 \in X$$ one can define the $$t$$-th iteration of the map:

$$
x_t := M^{t}(x_0)
$$

It is then ''natural'' to think of $$t$$ as the *time*, which means that we are considering the $$x_t$$ as the *state* of the our system at time $$t$$.
So, in general, we will describe a discrete dynamical system as:


\begin{equation}\label{eqn:discrete_system}
	x_{t+1} = M(x_t)
\end{equation}

where the interpretation of this symbols is now (hopefully) clear.

The study of of dynamical systems mainly deals with various aspects of the *trajectories* of a system, defined as the set of points $$\{M^t(x_0)\}$$ with $$t \in \mathbb{N}$$ (or a subset). As the name suggests, a trajectory is the set of the states in which the system ''goes'' when starting from $$x_0$$.


## Continuos dynamical systems

Continuos dynamical systems are described in term of differential equations. If we use the dot-notation for derivatives ( $$\dot{x} := dx/dt$$), we express a *continuous* dynamical system as:

\begin{equation}\label{eqn:continuos_system}
	\dot{x}(t) = f(x(t))
\end{equation}

which I will usually write $$\dot{x} = f(x)$$. Moreover, for notational convenience, I will use $$x(t)$$ when referring function of the continuos time and use the pedices $$x_t$$ for discrete series.
Note that here we are taking the derivative w.r.t *time* $$t$$, meaning that we need to have that notion underlying the framework. 

Moreover, note that here we describing the system in terms of its variation in time (the derivative reflects this fact): it tells us how the system is changing, as opposed to \eqref{eqn:discrete_system} which _directly_ describe where the system will go.

To recover this concept, we need the notion of _flux_ $$F_t$$:

\begin{equation}\label{eqn:flux}
	x_t = F_t(x_0)
\end{equation}

i.e., the flux _evolves_ the initial point $$x_0$$ in time. A concept of a (continuos) trajectory can be now defined, analogous to the one introduced for the discrete case. 

If you have attended any basic calculus class you will surely know that the flux is simply given by the integral of $$f$$

$$
F_t(x) = \int_0^t dt f(x(t))
$$

The problem is that most system do not allow an explicit expression for $$F_t$$! This integral must be computed numerically, and this creates all sorts of additional issues (both numerical and theoretical). 
Take a moment to reflect on this fact: knowing (i.e., being able to express) how the system varies in time does not necessarily mean that we know where it will be in the future.
Isn't it strange?

## Discretization (with an important remark)

As I wrote earlier, discrete system can be think of as a discretization of continuos one. In particular imagine, as common in practical cases, that our system is varying continuosly in time, but we are only able to sample it every $$\Delta t$$. So what we have is a series of measure of the system $$x(0), x(\Delta t), x(2 \Delta t), x(3 \Delta t), \dots $$ and so on. 
The relation which relates each observation to the following one can be given in terms of the flux \eqref{eqn:flux} as

$$
x(k \Delta t + \Delta t  ) = F_{\Delta t}x(k \Delta t)
$$

where $$k$$ is the index of our sample.
If we write $$x_k := x(k \Delta t)$$ the equation above becomes:

$$
x_{k+1} = F_{\Delta t}x_{k}
$$

which is just \eqref{eqn:discrete_system} where $$F_{\Delta t}$$ plays the role of the map and $$k$$ is the time index.

A **crucial remark** is now mandatory: 
discrete systems are usually expressed using an equation \eqref{eqn:discrete_system}, 
while continuos systems are described using \eqref{eqn:continuos_system}.
This may lead to think of $$f$$ as the _continuos time analog_ to $$M$$: but this is crearly **incorrect**! As we just showed, it is the flux \eqref{eqn:flux} which plays the role of the map (i.e., describing where a state will be in the future as a function of the present) in the continuos-time case.
Lots of confusion may raise from this, for example when people erroneusly relate [logistic equation]( https://en.wikipedia.org/wiki/Logistic_function#Logistic_differential_equation) with the [logistic map](https://en.wikipedia.org/wiki/Logistic_map).

If we want to introduce a discrete-time analogous of $$f$$ we would need to describe the system variation and write \eqref{eqn:discrete_system}:

$$
x_{t+1} - x_{t} = M(x_t) - x_{t}
$$

which of course resemble the _difference quotient_ which is used to define the derivative. But since in the discrete case we don't have a concept of time length, we cannot define a the limit which lead us to the concept of time derivative for a map.

