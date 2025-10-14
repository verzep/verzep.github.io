---
layout: post
title: "Coronavirus: The Mathematics of Contagion"
tags: epidemiology, dynamical systems
category: dynamical_systems
---

A recent [article in *Corriere*](https://www.corriere.it) did the great service of spreading the foundations of epidemiological modeling, explaining that the heart of the problem is a number, \(R_0\), which controls the spread rate of the coronavirus: every disease has its own, and that of this coronavirus appears to be about 2.5.

If \(R_0\) is less than 1, the disease will not spread; if it is greater than 1, an *outbreak* will occur, leading to an epidemic. But where does this number come from? On what does it depend? What does it mean that it represents “the average number of people each infected person infects”? And how should we interpret it?

Since 2.5 is clearly not a very low value (so much so that we find ourselves all confined at home), I decided to write an article explaining the mathematics of contagion.

---

## The SIR Model

This simple (and simplistic) model is based on two fundamental premises:

1. **Compartmentalization**  
   People are classified by their “state.” When a person changes state, they move from one compartment to another. We do not take into account age, health status, or any other factor: for modeling purposes, all people are considered equal. Given a population of \(N\) individuals, the SIR model considers three possible states:

   - **Susceptible** (\(S\)): individuals who are not yet sick but could potentially become so.  
   - **Infected** (\(I\)): individuals who are infected and thus contagious, who spread the disease.  
   - **Removed** (\(R\)): individuals who have been infected but no longer spread the disease nor can be re-infected. This includes recovered or deceased individuals; in this model we don’t distinguish them.  

   Because every member of the population belongs to one of these three groups, we have  

   $$
   S + I + R = N
   $$

   at every moment in time. If one more person becomes infected, \(I\) increases by 1 and \(S\) decreases by 1, so that the total \(N\) remains constant.

2. **Homogeneous Mixing**  
   This assumption states that every person has the same probability of encountering an infected individual. In simpler terms: if 10% of the population is infected, then 10% of the people you meet are infected. The same applies to the other compartments.  

   This assumption is somewhat coarse (if not unrealistic), but it allows us to avoid modeling individual contact networks, habits, or characteristics. For large populations, it tends to work reasonably well, at least as a first approximation.

Given these assumptions, suppose that at time \(t = 0\) we know \(S(0)\), \(I(0)\), and \(R(0)\). How do these quantities evolve over time? Let’s reason about the mechanics of the disease.

---

## Contagion

An individual becomes ill when they come into contact with an infected person. We model this by introducing a *transmission rate* \(\beta\): this is the probability that a susceptible individual becomes infected upon contact with an infected person. Suppose that, on average, an infected individual meets \(k\) people per unit time.

Under homogeneous mixing, of these \(k\) people, the fraction who are susceptible is \(S / N\) (the “density of susceptibles”). Because there are \(I\) infected individuals spreading the pathogen, the rate of change of the number of infected is:

$$
\frac{dI}{dt} = \beta \, k \, I \, \frac{S}{N}
$$

That is, the change \(dI\) is the rate in parentheses times the infinitesimal time interval \(dt\). Thus:

$$
dI = \beta \, k \, I \, \frac{S}{N} \, dt
$$

Hence, tomorrow’s number of infected is:

$$
I(t + dt) = I(t) + \beta \, k \, I(t) \, \frac{S(t)}{N} \, dt
$$

Because the total population is constant, every new infected is a loss from the susceptible pool:

$$
\frac{dS}{dt} = - \beta \, k \, I \, \frac{S}{N}
$$

---

## Recovery

Now suppose that people who are infected recover (or otherwise are removed) after some time. In our model, recovery occurs at a rate \(\mu\), which is the probability per unit time that an infected individual recovers. Thus, the change in \(R\) depends on the number of infected (not the number already removed):

$$
\frac{dR}{dt} = \mu \, I
$$

We must also adjust the equation for infected individuals by subtracting the recovered ones:

$$
\frac{dI}{dt} = \beta k \, I \, \frac{S}{N} - \mu \, I
$$

Now, since none of these quantities really depend on the absolute size \(N\), we “normalize” by dividing \(S, I, R\) by \(N\). Define:

$$
s = \frac{S}{N}, \quad i = \frac{I}{N}, \quad r = \frac{R}{N}
$$

Then the normalized equations become:

$$
\frac{ds}{dt} = -\beta k \, i \, s, \quad
\frac{di}{dt} = \beta k \, i \, s - \mu \, i, \quad
\frac{dr}{dt} = \mu \, i
$$

To find the actual number of infected you multiply \(i\) by \(N\). Notice that \(r\) (recovered) can only increase, and \(s\) (susceptible) can only decrease (since \(\frac{ds}{dt}\) is negative). The infected \(i\) has both a positive and a negative term, so its behavior may not be monotonic.

---

## Epidemic or Not?

We now give meaning to our parameters. Diseases with large \(\beta\) tend to spread easily (because it’s easy to transmit upon contact). The parameter \(\mu\) corresponds to how quickly an infected person recovers (or is removed): high \(\mu\) means the infected don’t stay infectious for long. That slows the spread, because each infected person has less time to infect others before recovering or being removed.

It is natural then to define:

$$
R_0 = \frac{\beta k}{\mu}
$$

This ratio is the famous \(R_0\). Indeed, \(R_0\) represents the average number of people infected by one infected person. It will be large if transmission is easy (large \(\beta\)) or if infectiousness lasts long (small \(\mu\)). But why is the threshold for an epidemic \(R_0 > 1\)?

The SIR equations are somewhat complex, but we can simplify in the early phase of the outbreak by assuming most people are still susceptible (\(r \approx 0\)). Then \(s = 1 - i\), and to first order, the evolution of the epidemic depends only on \(i\):

$$
\frac{di}{dt} = \bigl(\beta k - \mu\bigr)\, i = \mu \,(R_0 - 1)\, i
$$

Thus the approximate (early) solution is:

$$
i(t) \approx i_0 \, e^{\mu (R_0 - 1)\, t}
$$

We see that the exponent changes sign when \(R_0 < 1\). If \(R_0 < 1\), then \(i_0\) diminishes over time; if \(R_0 > 1\), \(i\) increases. In other words, \(R_0\) determines whether an outbreak can occur.

In the figure in the original article, I plotted the evolution of infected individuals for diseases with different \(R_0\) values. As expected, when \(R_0 < 1\), infected decline right away, while for higher \(R_0\) values they rise to a peak before declining.

This behaviour happens because the exponential approximation holds only when infected are few and there are enough susceptibles to infect. Over time, susceptibles are replaced by infected or recovered (who cannot be re-infected in this model), which saturates the spread. The parameter \(\mu\) only affects how fast the dynamics happen in time; diseases with the same \(R_0\) but different \(\mu\) behave similarly but on different time scales.

---

## The Danger of an Epidemic

Let’s consider a disease with \(R_0 = 2\) (optimistic compared to coronavirus). The exponential approximation diverges fairly quickly; assuming time in days, after three weeks saturation is already underway. The peak of infections occurs around day 40, then declines, and by day 150 there are virtually no infected individuals.

I emphasize that these numbers are not quantitative predictions, but are intended to illustrate the phenomenon qualitatively.

At the peak (day ~40), almost 18% of the population is infected! In a population of 60 million, that’s nearly 11 million people — an enormous and alarming number. If we also consider the evolution of \(s\) and \(r\), at the end of the epidemic (when \(i = 0\)), almost 80% of the population will have been infected and become removed.

Assuming a case fatality rate of 4% (roughly the estimated value for COVID-19) means a mortality over the whole population of 3.2% — nearly two million deaths in a population of 60 million. That is a gargantuan number. This is the reason for the stringent measures currently being imposed: the danger is immense.

What can we do? \(R_0\) depends on \(\beta\) and \(\mu\), traits of the pathogen that are difficult to alter. However, there is another parameter: \(k\), the average number of contacts per person per unit time. This is precisely what restrictive measures target: encouraging people to stay home and reduce gatherings reduces contacts, and thus lowers \(R_0\).

I am not a medical doctor nor an epidemiologist; the only goal of this article is to show how even a simple model can explain a complex phenomenon such as epidemic spread, and to give meaning to the restrictive measures we are living under.

The sources of inspiration for my article were the splendid [3Blue1Brown video](https://www.youtube.com) and chapter 10 of Barabási’s *Network Science*, which explores more refined contagion models accounting for contact networks or vaccination.

**Stay well — and stay isolated.**
