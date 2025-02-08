### Storage Capacity
To see how many patterns can be stored in a network, let's consider the following quantity:

$$
\begin{equation}
    C^\nu_i := -x^\nu_i \frac{1}{N}\sum_{j}\sum_{\mu \neq \nu} x_i^\mu x_j^\mu x_j^\nu
\end{equation}
$$

Which is the Cross Talk term in the stability condition multiplied by $-x_i^\nu$. 
If $C^\nu_i$ is negative, the Cross Talk term has the same sign of the pattern element $x_i^\nu$ and it will do nothing.
If instead $C^\nu_i$ is positive and larger than 1, it changes the sign of $h_i^\nu$ and the unit $i$ of the pattern $\nu$ will not be stable.
$C^\nu_i$ only depends on the patterns $x_j^\mu$ that are stored in the network:
if we consider purely random patterns, with equal probability of $-1$ and $+1$, we can estimate the probability of errors:

$$
P_{\text{error}} = P(C^\nu_i > 1)
$$

So, if we decide an error rate that we can tolerate (e.g., $P_\text{error} < 0.01$), we can estimate the number of patterns that can be stored in the network. 
To do so, let's compute $P_{\text{error}}$ in the case of large $N$ and $p$. As $C^\nu_i$ is $\frac{1}{N}$ times the sum of $N(p-1) \approx Np$ independent random variables that can be either $-1$ or $1$, we know that its distribution will be binomial with mean $0$ and $\sigma^2 = p/N$.
But since we assumed $Np$ to be large, we can approximate it with a gaussian. So we can write: 

$$
\begin{equation}
P_{\text{error}} \approx \int_{1}^{\infty} \frac{1}{\sqrt{2\pi p/N}}e^{-x^2/2p/N}dx = \frac{1}{2}\left(1 - \text{erf}({\sqrt{\frac{N}{2p}}})\right)
\end{equation}
$$

This equation allows us to estimate the number of patterns that can be stored in the network.
As one could have expected, the number of patterns $p$ depends on the number of neurons $N$, so it usually make sense to consider the ratio $\alpha := p/N$.



