---
layout: post
title: The Brownian Motion - Part 2
tags: stochastic_processes, fourier transform
category: stochastic_processes
---

In this second post about Brownian Motion I will discuss how to solve the Heat Equation. 
This will lead to a brief introduction to the Fourier Transform and what it is, in my opinion, a nice way of thinking about its meaning.
Once we have the explicit form of the solution, we can derive the distinctive feature of all diffusion phenomena: the linear dependence of their variance with respect to time.




### Solving the Heat Equation

In the [previous post](https://verzep.github.io/Brownian-Motion-1/), we showed how Einstein was able to describe the _Brownian Motion_ in terms of the _Heat Equation_:


\begin{equation}\label{eqn:heat}
    \frac{\partial p}{\partial t} = D\frac{\partial^2 p}{\partial x^2}
\end{equation}

in which we have defined the _diffusion coefficient_:

\begin{equation}
   D =\frac{\langle \Delta^2 \rangle}{2\tau}
\end{equation}


But how do we solve this?


### The Fourier Transform

We will use the Fourier Transform. Of course, this short blog post cannot possibly explain all the details and subtleties of this [vast topic](https://en.wikipedia.org/wiki/Fourier_transform). 
I will limit myself to introducing the notation I will use (as there are various possible ways).

Roughly speaking, we start by saying that any 'good' function admits a _Fourier transform_ that reads:

\begin{equation}\label{eqn:FT}
    \hat{p}(k,t) := \frac{1}{2\pi} \int dx~ e^{-ikx} p(x,t)   
\end{equation}

Note that here we are performing the Fourier transform _in space_ [[^1]] so that $\hat{p}(k,t)$ does not depend on $x$ anymore, but only on time $t$ and on the wave number $k$ (i.e., the spatial frequency).

The [Fourier inversion theorem](https://en.wikipedia.org/wiki/Fourier_inversion_theorem) allows us to write our original function using its Fourier Transform \eqref{eqn:FT}:

\begin{equation}\label{eqn:AFT}
    p(x,t) := \int dk~ e^{ikx} \hat{p}(k,t)   
\end{equation}

### Digression: Fourier as a change of basis

I like to think of the Fourier transform as a sort of 'improper' change of basis. 
In fact, when we express a vector $\mathbf{v}$ given a set of basis vectors $\{ \mathbf{\phi}_i\}$ we write

\begin{equation}\label{eqn:v_four)
\mathbf{v} = \sum_j c_j \mathbf{\phi}_i
\end{equation}

or, using coordinates:

\begin{equation}
v_i = \sum_k c_k \phi_{ik}
\end{equation}

in which ${c_k}$ are the coefficients and $\phi_{ik}$ is a (really bad) notation for the $k$-th element of the $i$-th vector. 
This means that, given the basis, knowing the set of coefficients is the same as knowing the vector (which is in fact expressed in this basis by the coefficients themselves).

The same principle can hold for a function $f(x)$ that we can express as a combination of basis-function ${\phi_k(x)}$.

\begin{equation}
f(x) = \sum_k c_k \phi_k(x)
\end{equation}

and, just like before, for a given set of basis functions, knowing the coefficients gives us all the information we need to reconstruct the original function.
This is the case, e.g., of the [Fourier Series](https://en.wikipedia.org/wiki/Fourier_series) (a discrete version of the Fourier Transform). 

Finally, if instead of using a discrete set of basis-function  we use a continuous one we need to parametrize it using a continuous variable instead of discrete one ($\phi_k(x) \rightarrow \phi(k,x)$) .
Moreover, the summation will turn into an integral ($\sum_k \rightarrow \int dk$).

\begin{equation} \label{eqn:f_four)
f(x) = \int dk ~ c(k) \phi(k,x)
\end{equation}

Note the similarity between \eqref{eqn:f_four) and \eqref{eqn:v_four).
In the Fourier transform, $\hat{p}$ are the coefficients, and the complex exponential functions are the basis on which we express $p$.

### Solution

#### Step 1: using the Fourier Transform

Now that we know the $p$ can be expressed in terms of the Fourier coefficients via \eqref{eqn:AFT}, we can try to plug this representation into the Heat equation \eqref{eqn:heat}. This leads to the following equation:

\begin{equation}\label{eqn:heat_FT}
       \frac{\partial}{\partial t}  \int dk~ e^{ikx} \hat{p}(k,t)  = 
       \frac{\partial^2}{\partial x^2}  \int dk~ e^{ikx} \hat{p}(k,t)
\end{equation}

Concerning the **left-hand-side**, we see that the only time dependency is in $\hat{p}$, thus by bringing the derivative inside the integral we get:

\begin{equation}\label{eqn:heat_FT_left}
       \frac{\partial}{\partial t}  \int dk~ e^{ikx} \hat{p}(k,t)  = 
        \int dk~ e^{ikx} \frac{\partial}{\partial t}  \hat{p}(k,t)
\end{equation}

On the **right-hand-side** instead, the only term that depends on $x$ is the complex exponential:

\begin{equation}
    \frac{\partial^2}{\partial x^2}  \int dk~ e^{ikx} \hat{p}(k,t)  = 
    \int dk~ \frac{\partial^2}{\partial x^2}e^{ikx} \hat{p}(k,t)
\end{equation}

and we can easily perform the derivative:

\begin{equation}\label{eqn:heat_FT_right}
    \int dk~ \frac{\partial^2}{\partial x^2}e^{ikx} \hat{p}(k,t) =
    \int dk~ (-Dk~^2)e^{ikx}\hat{p}(k,t)
\end{equation}

in which the minus sign is because $i^2 = -1$.[[^2]]


#### Step 2: Decoupling

So, our original equation \eqref{eqn:heat} can now be rewritten as:

\begin{equation}
        \int dk~ e^{ikx} \frac{\partial}{\partial t} \hat{p}(k,t)  =   \int dk~ (-Dk^2\hat{p}(k,t)) e^{ikx}
\end{equation}

or, rearranging the terms:

\begin{equation}
        \int dk~  (\frac{\partial}{\partial t} \hat{p}(k,t) +Dk^2\hat{p}(k,t) ) e^{ikx} = 0  
\end{equation}

which can be true only when

\begin{equation} \label{eqn:decoupled}
        \frac{\partial}{\partial t} \hat{p}(k,t) = - Dk^2\hat{p}(k,t)
\end{equation}

for each $k$. This means that, by the use of the Fourier transform, we were able to write our original equation as an (infinite) system of decoupled differential equations.

Solving \eqref{eqn:decoupled} is straightforward and the solution reads:


\begin{equation} \label{eqn:solution_FT_noIC}
         \hat{p}(k,t) = \hat{p}(k,0)e^{- Dk^2t} 
\end{equation}


#### Interlude: Initial Condition


For solving \eqref{eqn:heat} we need an _initial condition_. Physically, we may assume that we know where the particle is a $t=0$ and call this position $x_0$. Mathematically this translates into the notation

$$
p(x,0) = \delta(x-x_0)
$$

in which $\delta$ is Dirac's delta.

But since we moved our problem from the physical space to the Fourier space, we must do the same with our initial condition.
This can be steadily done by using \eqref{eqn:FT}:

$$
\begin{aligned}
    \hat{p}(k,0) &=  \frac{1}{2\pi} \int dx~ e^{-ikx} p(x,0) \\
                 &= \frac{1}{2\pi}\int dx~ \frac{1}{2\pi}e^{-ikx} \delta(x-x_0) = \frac{e^{-ikx_0}}{2\pi}
    \end{aligned}
$$

Now that we have our initial condition in the Fourier space

\begin{equation}\label{eqn:IC_FT}
    \hat{p}(k,0) = \frac{1}{2\pi}e^{-ikx_0}
\end{equation}

we can plug it into our solution \eqref{eqn:solution_FT_noIC} to obtain:

\begin{equation}\label{eqn:solution_FT}
    \hat{p}(k,t) = \frac{1}{2\pi}e^{-ikx_0}e^{- Dk^2t}
\end{equation}

Which is the solution of the Heat equation \eqref{eqn:heat} in the Fourier space.

#### Step 3: Anti-Transform

To obtain the solution in the physical space (sometimes called _the propagator_), we simply need to plug anti-transform $\hat{p}$, i.e., to insert \eqref{eqn:solution_FT} into \eqref{eqn:AFT}.

\begin{equation} \label{eqn:propagator}
     p(x,t | x_0, 0) = \frac{1}{2\pi} \int dk~ e^{ikx} e^{-ikx_0}e^{- Dk^2t}
\end{equation}

To solve this Gaussian integral, we first rewrite the integrand as


$$
e^{ikx} e^{-ikx_0}e^{- Dk^2t} = e^{ik(x-x_0)- k^2Dt}
$$

and then, by completing the square [[^3]], we obtain

$$
    e^{ik(x-x_0)- k^2Dt} 
    = e^{-\frac{(x-x_0)^2}{4Dt}} e^{-Dt(k-i(x-x_0))^{2}}
$$

Thus, \eqref{eqn:propagator} becomes:


\begin{equation}
     p(x,t | x_0, 0) = \frac{e^{-\frac{(x-x_0)^2}{4Dt}}}{2\pi} \int dk~ e^{-Dt(k-i(x-x_0))^{2}}
\end{equation}

and by using the change of variables $q =k-i(x-x_0)$ we have.

\begin{equation}
      p(x,t | x_0, 0) = \frac{e^{-\frac{(x-x_0)^2}{4Dt}}}{2\pi} \int dq~ e^{-Dtq^{2}}
\end{equation}

Finally, by remembering that $\int dy~e^{-\alpha y^2}=\sqrt{\frac{\pi}{\alpha}} $ we obtain the solution

\begin{equation}
      p(x,t | x_0, 0) = \frac{1}{\sqrt{4\pi D t}}e^{-\frac{(x-x_0)^2}{4Dt}}
\end{equation}

This means *the propagator*  is a _Gaussian distribution_ with mean $x_0$ and variance $\sigma^2 = 2Dt$.


### The propagator

But what does $p(x,t | x_0, 0)$ mean? 
As the notation suggests, it is the probability (density) of being in position $x$ at time $t$ given that you were in $x_0$ at time $0$.

To find the explicit form of the propagator, we assumed that our initial condition $p(x,0)$ was a Dirac's delta, but now that we have it, we can build the solution for a _generic_ initial condition $p_0$ by:

\begin{equation}
    p(x,t) = \int dy ~ p(x,t|y,0) p_0(y) 
\end{equation}

This is simply the [_Superposition principle_](https://en.wikipedia.org/wiki/Superposition_principle), which follows directly from the linearity of the original equation.

Now that we know how a particle subject to Brownian motion behaves, we can draw some really _important conclusions_.
For example, we can ask ourselves what will be the _average position_ of the particle in time. 
Since we know $p$ is a Gaussian, the _expected value_ of the position $\langle x(t) \rangle = \int dx~ x p(x,t|x_0,0)$ will simply be equal to its mean $x_0$, for every $t$. 
So if we know that the particle starts in $x_0$, we expect its (average) position not to vary in time. This is an obvious consequence of the symmetry of equation \eqref{eqn:heat}, which in turn derives from the parity of the probability functions of the displacement $\phi(\Delta)$ (see my [previous post](https://verzep.github.io/Brownian-Motion-1/)).
Let's now set for simplicity $x_0=0$ and consider the _variance_ of our process $\langle x^2(t) \rangle = \int dx~ x^{2} p(x,t|x_0,0)$. Since $p$ is a Gaussian, we know that it is equal to:

$$
\langle x^2 \rangle = \sigma^2 = 2Dt
$$

Which depends **linearly** on time. This is the _defining feature of diffusion processes_! Note that this means the average displacement (i.e., the standard deviation $\sigma$) of the Brownian particle is _not_ proportional to the time elapsed but to its square root!
This fact  explains why previous experimental results concerning the velocity of Brownian particles led to incoherent results: linear time dependence was incorrectly assumed (in fact, try to think on how you would define the velocity of this process...).

This is already quite an astonishing result on its own, as it allows experimentalists to test Einstein's approach by measuring this quantity to see whether it matches the predictions or not. 
But Einstein did not stop there. 
As we will see in the next blog post, he used this result to prove the existence of atoms!

-------------------------------------------------------

[^1]: as $p$ is a function of space and time, we need to specify to which argument we are applying the transform. 
    The reason for choosing $x$ will be clear later.

[^2]: If you wanna sound fancy, you may say that this is due to the fact that _the Fourier modes are eigenfunctions of the [Laplace operator](https://en.wikipedia.org/wiki/Laplace_operator) with eigenvalues_ $-k^2$.

[^3]: The method of completing the squares simply relies on the fact that since
    $$
    (ax+b)^2 = ax^2 + b^2 +2axb
    $$
    then
    $$
    ax^2 + 2axb =  (ax+b)^2 -b^2
    $$
    .In our example one has $a=-Dt$ and $b = \frac{-i(x-x_0}{2Dt}$, and we can use this formula to rewrite the exponent.
    



