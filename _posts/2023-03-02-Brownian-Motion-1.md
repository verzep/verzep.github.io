---
layout: post
title: The Brownian Motion - Part 1
tags: stochastic_processes
category: stochastic_processes
---

The study of Brownian motion laid the ground for developing the field of stochastic processes. 
Einstein was the first to shed light on this phenomenon, but I think this work's importance is usually underestimated. 
In this series of 3 blog posts, I want to argue that this work is conceptually and practically even more groundbreaking than special relativity. 
In this first part, we will show how Einstein drew the analogy between the Brownian motion and the (seemingly unrelated) heat diffusion.


## Einstein's Annus Mirabilis


In his [_annus mirabilis_](https://en.wikipedia.org/wiki/Annus_mirabilis_papers), 25-year-old Albert Einstein published four papers destined to change the history of physics completely. 
In two of them, the _theory of special relativity_ (possibly the most famous physical theory) was introduced and developed. 
Another work involved the explanation of the _photoelectric effect_, a fundamental problem in quantum mechanics, which will be the motivation for which he was awarded the Nobel Prize in Physics  in 1921.
But, arguably, the most important of his contribution in that year was the paper concerning the *Brownian Motion*, which led to a clear proof of the _atomic hypothesis_, which was still a controversial issue among physicists back then.
But how is the movement of particles suspended in a liquid connected to the structure of matter? 


## The Brownian motion

In 1828, the botanist Robert Brown observed that pollen particles suspended in water would move following apparently random trajectories.[[^1]]
Einstein gave the theoretical explanation for this strange behavior many years later.[[^2]] 
In his reasoning, Einstein hypothesizes that the erratic movement is due to the collision of the suspended particle with the fluid molecules.
These collisions are too high in number to even try to predict, but we can describe them in _probabilistic_ terms. 
In turn, this will lead to a probabilistic description of our particle position. 

In the one-dimensional case, let us define $p(x,t)$ as the _probability_ (density) of the particle being in the position $x$ at time $t$.
We are looking for the probability $p(x, t + \tau)$, i.e., the probability distribution after a time $\tau$ has elapsed.

Let us define the *displacement* as $\Delta(t-s) := x(t) - x(s) = x(s+\tau) - x(s) = \Delta(\tau)$ .
As we mentioned, it would be impossible to describe it deterministically, so we are again interested in its _probability distribution_ $\phi(\Delta, \tau)$, which is the probability of having a displacement $\Delta$ given that a time $\tau$ has elapsed.
Some assumptions can be made about this distribution:

* The displacement probability $\phi(\Delta, \tau)$ does not depend on the particle position $x$.
* As a probability distribution, it must be normalized $\int d\Delta \phi(\Delta,\tau)=1$. Physically, this is simply the requirement that the particle must go somewhere.
* The probability of negative and positive displacement are equal (_isotropy_). This means that the $\phi$ must be an even function $(\phi(\Delta,\tau) = \phi(-\Delta,\tau)$.


The probability of finding the particle at $x$ at time $t+\tau$ can be computed using the probability that it was in $x-\Delta$ at time $t$ multiplied by the probability that a displacement $\Delta$ occurred and integrating ("summing") over all the possible displacements.
This approach leads to the[ _Chapman-Kolmogorov Equation_](https://en.wikipedia.org/wiki/Chapman%E2%80%93Kolmogorov_equation), which reads:

\begin{equation}\label{eqn:CKE}
    p(x, t+\tau) = \int d\Delta ~p(x-\Delta) \phi(\Delta,\tau)
\end{equation}

Take some time to convince yourself that  this makes sense: we are basically considering all the possible ways in which the particle has arrived in $x$.

## Kramers-Moyal Expansion

We now want to write Eq.\ref{eqn:CKE} in differential form. 
To do so, we start by Taylor expanding the left-hand side w.r.t. time:

\begin{equation}
    \label{eqn:taylor_time}
    p(x,t+\tau) \approx p(x,t) + \tau \frac{\partial p}{\partial t}
\end{equation}

Note that the time interval $\tau$ (usually called *correlation time*) must have two apparently contradicting features: it must be *short* compared to the time scale at which we are observing the process (otherwise, Taylor's expansion wouldn't hold), but *long* enough such that the particle has 'forgotten' the last movement (which is the independence of the displacements). 

Using the taylor approximation w.r.t $x$ leads to

\begin{equation}\label{eqn:taylor_space}
    p(x-\Delta,t) \approx 
    p(x,t) - \Delta \frac{\partial p}{\partial x} + \frac{1}{2} \Delta^2 \frac{\partial^2 p}{\partial x^2}
\end{equation}

This approach is called the _Kramers-Moyal Expansion_.
Plugging \eqref{eqn:taylor_time} and \eqref{eqn:taylor_space} into \eqref{eqn:CKE} leads to:


\begin{equation}\label{eqn:KME}
\begin{aligned}
    p(x,t) + \tau \frac{\partial p}{\partial t} &= 
    \int d\Delta ~(p(x,t) - \Delta \frac{\partial p}{\partial x} + \frac{1}{2} \Delta^2 \frac{\partial^2 p}{\partial x^2}) \phi(\Delta,\tau) \\
    & = 
    \int d\Delta ~p(x,t)\phi(\Delta,\tau) \\
    &- \int d\Delta \Delta \frac{\partial p}{\partial x}\phi(\Delta,\tau)\\ 
    &+ \frac{1}{2} \int d\Delta \Delta^2 \frac{\partial^2 p}{\partial x^2} \phi(\Delta,\tau)
\end{aligned}
\end{equation}
Let's now examine the right-hand-side term by term:

\begin{equation}
    \int d\Delta ~p(x,t)\phi(\Delta,\tau)=
    p(x,t)\int d\Delta ~\phi(\Delta,\tau)=p(x,t)
\end{equation}

as $p$ does not depend on $\Delta$ and we assumed that $\int d\Delta ~\phi(\Delta,\tau)=1$.

\begin{equation}
    - \int d\Delta \Delta \frac{\partial p}{\partial x}\phi(\Delta,\tau)
    =
    -  \frac{\partial p}{\partial x} \int d\Delta \Delta\phi(\Delta,\tau) = 0
\end{equation}
as we assumed that $\phi$ is symmetric, implying that $\int d\Delta \Delta\phi(\Delta,\tau)=0$.
Note that $d\Delta \Delta\phi(\Delta,\tau) =: \langle\Delta \rangle$ is the expected value (the mean) of the displacement.

\begin{equation}
\frac{1}{2} \int d\Delta \Delta^2 \frac{\partial^2 p}{\partial x^2} \phi(\Delta,\tau)
=
\frac{1}{2}\frac{\partial^2 p}{\partial x^2} \int d\Delta \Delta^2 \phi(\Delta,\tau) 
= 
\frac{\langle \Delta^2 \rangle}{2}\frac{\partial^2 p}{\partial x^2}
\end{equation}

In which $\langle \Delta^2 \rangle$ is the variance of the displacement.

## The Heat Equation

Since we have $p(x,t)$ on both sides, they will simplify and Eq.\ref{eqn:KME} reduces to:

\begin{equation}\label{eqn:heat}
    \frac{\partial p}{\partial t} = \frac{\partial^2 p}{\partial x^2}
\end{equation}

in which we have defined the _diffusion coefficient_:

\begin{equation}
   D =\frac{\langle \Delta^2 \rangle}{2\tau}
\end{equation}

Its dimensions are a squared length over time. 
This might be somehow puzzling, since it means that it depends on the ratio between the _square_ of the space length we are considering and the time length. 
This will be fundamental later.

Eq.\ref{eqn:heat} is known as  the _heat equation_, the diffusion equation, or the Fourier equation. [[^3]] 
So, what we have managed to do so far is to show that the problem of a particle suspended in a fluid is analogous to the problem of heat propagation. By solving the heat equation, we can then infer some properties of the Brownian motion.

The solution to this equation was known in Einstein's time, so he simply wrote it down in his paper. But I think it is pretty interesting to solve it ourselves: so my next blog post will be devoted to this problem.


----------------------------------------

[^1]: This erroneously led him to conclude that the motion was related to the fact that pollen was "alive".

[^2]: Einstein, Albert. "Über die von der molekularkinetischen Theorie der Wärme geforderte Bewegung von in ruhenden Flüssigkeiten suspendierten Teilchen." Annalen der physik 4 (1905).

[^3]: The careful reader might have noticed that this is due to the fact that we only took the linear term when performing the Taylor's expansion in time (Eq. \ref{eqn:taylor_time}). By including the second order term, one would have obtained the [Telegraph Equation](https://en.wikipedia.org/wiki/Telegrapher%27s_equations): $$ \partial_t p + \frac{\tau}{2}\partial_t^2 p = D \partial_x^2 p $$.