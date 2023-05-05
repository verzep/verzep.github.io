---
layout: post
title: The Brownian Motion - Part 3
tags: stochastic_processes, thermodynamics
category: stochastic_processes
---


When starting this series of posts, I claimed that their intent was to argue that Einstein's description of Brownian motion was his most groundbreaking contribution among the ones he presented in his annus _mirabilis_. 
In the [first blog-post](https://verzep.github.io/Brownian-Motion-1/) I presented Einstein's approach to the problem, and in the [second one](https://verzep.github.io/Brownian-Motion-2/), I showed how to solve the _Heat equation_ (i.e., the diffusion equation). 
Now we have all the tools that we need to discuss how Einstein's approach to Brownian motion led to the _proof of the existence of Atoms_.

### Why the Atoms?

At the beginning of the 20th century atoms were considered by many physicists to be purely hypothetical constructs: many scientists  who believed in philosophical positivism (e.g., Mach or Ostwald) considered energy the fundamental physical reality and regarded atoms and molecules as mathematical fictions. 
Boltzmann, for example, struggled his all life due to his belief in the existence of atoms. From [Wikipedia](https://en.wikipedia.org/wiki/Atomic_theory):

> Most chemists, since the discoveries of John Dalton in 1808, and James Clerk Maxwell in Scotland and Josiah Willard Gibbs in the United States, shared Boltzmann's belief in atoms and molecules, but much of the physics establishment did not share this belief until decades later. Boltzmann had a long-running dispute with the editor of the preeminent German physics journal of his day, who refused to let Boltzmann refer to atoms and molecules as anything other than convenient theoretical constructs. 

In this context, Einstein's work was really groundbreaking: by giving a description of particles motion based on their interaction with microscopic objects, he was also able to make verifiable predictions about the atomic scale. 




### Barometric Equation

Following [Wikipedia](https://en.wikipedia.org/wiki/Brownian_motion), I'll approach the problem by using the _barometric equation_ instead of the osmotic pressure (used in Einstein's original work [[^1]] ) as it is much easier to think about.
We will analyze identical particles suspended in a viscous fluid and subject to gravity. Under reasonable conditions, this particles will reach a density that is described by the barometric equation:

\begin{equation}\label{eqn:barometric}
    \rho(x) = e^{\frac{-mgx}{k_B T}}
\end{equation}

In which $x$ is vertical position, $m$ is the particles mass, $g$ is the acceleration due to gravity, $T$ is the temperature, and $k_B$ is the Boltzmann constant, i.e., the ratio between the [Universal Gas Constant](https://en.wikipedia.org/wiki/Gas_constant) $R$ [Avogadro number](https://en.wikipedia.org/wiki/Avogadro_constant) $N_a$: 

\begin{equation}\label{eqn:kb}
    k_B := \frac{R}{N_a}
\end{equation}

It is important to note that the particles are subject to two distinct actions: _gravity_, which tends to push them down (i.e., make them all reach the same state), and _diffusion_, which tends to spread them (i.e., reach all states equally).
This is, in turn, reflected in the fact that the exponent  is the ratio between two quantities: the $mgx$ term, which accounts for the gravity, and $k_B T$, which accounts for the diffusion.


We are interested in studying the flux of particles, which is defined as:

\begin{equation}\label{eqn:J_in_v}
    J :=  v \rho
\end{equation}

### Flick's law

In these situations, the flux of particles is given by [Flick's law](https://en.wikipedia.org/wiki/Fick%27s_laws_of_diffusion)

\begin{equation}\label{eqn:flick}
    J = -D \frac{d\rho}{dx}
\end{equation}

This simply accounts for the fact that particles will tend to diffuse from higher density to lower density regions.

Equating \eqref{eqn:J_in_v} and \eqref{eqn:flick} we obtain:

\begin{equation}\label{eqn:J_equality}
    v \rho =  -D \frac{d\rho}{dx} 
\end{equation}

and the derivative of $\rho$ w.r.t. $x$ can be computed by using \eqref{eqn:barometric}:

\begin{equation}
    \frac{d\rho}{dx} = \frac{d}{dx} e^{\frac{-mgx}{k_B T}} = \frac{-mg}{k_B T} e^{\frac{-mgx}{k_B T}} = \frac{-mgx}{k_B T} \rho
\end{equation}

leading to

\begin{equation}\label{eqn:J_equality}
    v \rho =  -D \frac{-mgx}{k_B T} \rho
\end{equation}

Then, by simplifying $\rho$ from both sides, we obtain an expression for the velocity:

\begin{equation}\label{eqn:v_thermo}
    v = \frac{Dmg}{k_B T}
\end{equation}

It's now time to make use of some fluid dynamics.

### Stoke's law

By Stoke's law, we know that the asymptotic velocity of a small spherical particle moving in a viscous fluid is given by:

\begin{equation}\label{eqn:v_fluid}
    v = \mu m g
\end{equation}

where $\mu$ is given by

\begin{equation}
    \mu = \frac{1}{6 \pi \eta r}
\end{equation}

Here $\eta$ is the dynamic viscosity, and $r$ is the particle's radius.

These two velocities should be equal at equilibrium, i.e.,  we can use \eqref{eqn:v_fluid} and \eqref{eqn:v_thermo} to obtain:

\begin{equation}
    \frac{Dmg}{k_B T} = \mu m g 
\end{equation}

And rearranging the terms, we have an expression for the _Diffusion coefficient_:

\begin{equation}
    D = k_B T \mu
\end{equation}

Finally, by recalling the definition of the Boltzmann Constant \eqref{eqn:kb} we obtain an expression for the _Avogadro Number_:

\begin{equation}
    N_a = \frac{RT}{6 \pi \eta r D}
\end{equation}

### Counting atoms

So, how does Einstein's theory play a role in this?
Based on his approach, we know that the _diffusion coefficient_ is the average quadratic displacement of the particle:

\begin{equation}
    D = \frac{\langle x^2 \rangle}{2t}
\end{equation}

And this means that _it can be measured_! 
So, if we know $R$, $\eta$, and $T$, and measure $D$, we can obtain the _Avogadro Number_, i.e., we can **count atoms**!


The formula he had derived for expressing the diffusion coefficient in terms of atomic dimensions and the size of the particles would now make it possible to extract information about the atomic scale from the irregular motion of the suspended particles to the atomic scale, if this motion of individual particles could be related to the bulk property of diffusion.
Einstein himself also recognized that failure to observe this motion would be a strong argument against the molecular-kinetic theory of heat.
But, luckily, in 1908 (two years after Boltzmann death), Jean Baptiste Perrin, a brilliant experimental physicist, performed a series of experiments, that confirmed Einstein's prediction [[^2]]. He was awarded the Nobel Prize for physics in 1926.


Richard Feynmann famously said that the most informative sentence about our knowledge of the world would be:

> All things are made of atoms—little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another.

The proof that this is in fact true is due to Einstein! This is why I consider Einstein's explanation of Brownian motion a contribution that is conceptually groundbreaking, even more revolutionary than special relativity. 
And if you are interested about this topic and want to know more about the historical and philosophical background, you can refer to this [[^3]].

[^1]: Einstein, Albert. "Über die von der molekularkinetischen Theorie der Wärme geforderte Bewegung von in ruhenden Flüssigkeiten suspendierten Teilchen." Annalen der physik 4 (1905).
[^2]: **Original Paper**: J. Perrin, “Brownian movement and molecular reality,” translated by F. Soddy (1910). The original paper, “Le Mouvement Brownien et la Réalité Moleculaire” appeared in the Ann. Chimi. Phys. 18. (1909)  
    **A modern replication with a really interesting disccusion**: Newburgh, Ronald, Joseph Peidle, and Wolfgang Rueckner. "Einstein, Perrin, and the reality of atoms: 1905 revisited." American journal of physics 74.6 (2006): 478-481.
[^3]: Renn, Jürgen. "Einstein's invention of Brownian motion." Annalen der Physik 14.S1 (2005): 23-37.


\end{document}
