![Application screenshot](/screenshot.png)

# About

This application solves the classic newsvendor problem via gradient-based stochastic optimization.

The newsvendor problem is given as:

```math
\underset{x}{\mathrm{max}}\,\, \mathbb{E} \left[F(x, W)\right] = \underset{x}{\mathrm{max}}\,\,\mathbb{E}\left[p\,\mathrm{min}(x, W) - cx \right]\,,
```

where $x$ is the order quantity of a perishable product (e.g., a newspaper), $W$ is the random demand, $p$ is the price at which we sell the product and $c$ is the cost at which we buy the product.

In the application, we assume that the demand distribution is unknown and employ a stochastic search algorithm as follows:

```math
x_{n+1} = \mathrm{max} \left[0, x_n + \alpha \frac{\mathrm{d} F(x, W_{n+1})}{\mathrm{d}x}\bigg|_{x=x_n} \right]\,,
```

where $\alpha$ is a step size. In the application, three different step size rules are implemented.

For further references, check out the excellent textbooks by W. B. Powell on sequential decision analytics:

- [Sequential decision analytics and modelling](https://castle.princeton.edu/sdamodeling/)
- [Reinforcement Learning and Stochastic Optimization: A unified framework for stochastic optimization](https://castle.princeton.edu/RLSO/)
