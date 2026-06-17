---

layout: post
title: "Everything is a computer (if you are brave enough) - Part 1"
tags: computation, neuroscience, artificial-intelligence, neural-networks, philosophy
category: opinion
---

There is a question that computational neuroscientists are not supposed to ask too casually, because it sounds either obvious or meaningless: **Is the brain a computer?**

If by *computer* we mean a laptop, then the answer is clearly no. The brain does not have a keyboard, a hard drive, a central processor, or a program written somewhere inside the skull.

But if by *computer* we mean something that takes inputs, changes its internal state, and produces outputs, then the answer starts to look less obvious. The brain receives sensory signals, transforms them through neural activity, and produces perceptions, decisions, movements, and words.

So before asking whether the brain is a computer, we should ask a simpler question:

> What would it mean for anything to compute?

This post is the first part of a small series based on a talk I gave at Pint of Science. The title of the talk was deliberately provocative: *Everything is a computer, if you are brave enough*. I do not mean that literally, at least not yet. A stone is not secretly running Python. You cannot play Minecraft on a table [[^1]]. But the claim becomes less absurd once we stop thinking of computers only as digital machines and start thinking of computation as a transformation: an input becomes an output, according to some structure, rule, or dynamics.

To see why this is interesting, let us begin with a very simple task.


## Is this a tree?

Imagine I show you this picture and ask:

> Is this a tree?

![]({{ site.url }}/images/2026-06-17/tree.jpg)

Easy. Yes.

What about this one?

![]({{ site.url }}/images/2026-06-17/Broccoli.png)

Presumably, you answered: no.[[^2]] But it is not a completely absurd question. It sort of looks like a tree. It has a trunk-like structure, branch-like structures, and a crown-like top. It is not a tree, but it is strangely tree-shaped. Still, you are somehow able to tell that it is not a tree.

Now consider this one:

![]({{ site.url }}/images/2026-06-17/fir_tree.jpg)

Again, this is a tree, even though it is quite different from the first one. It has a conical structure, needles instead of broad leaves, and a very different overall shape.

And now this:

![]({{ site.url }}/images/2026-06-17/palm.jpg)

Is this a tree? Most people would still say yes. But if we start asking for the precise rule, things become less obvious. What exactly makes something a tree? Does it need a wooden trunk? Branches? Leaves? A certain height? Secondary growth? Does a palm count? Does bamboo count? What about a banana plant?

Finally, imagine I show you this:

![]({{ site.url }}/images/2026-06-17/Tralalero_Tralala.png)

Is this a tree?

No. At least, I hope not.

Now, here is the interesting part. If you are older than four, you can probably solve this task without much effort. You look at the images, and immediately something in your brain says: *tree*, *not tree*, *tree*, *maybe tree*, *definitely not tree*. But if I ask you to write down the explicit rule you used to answer, the task becomes much harder.

You know how to recognize a tree, but you probably do not know the exact rule that defines a tree. Or, more carefully: your brain can solve the classification problem, even if you cannot express the solution as a clean formal definition.

This is a very familiar situation. We recognize faces without knowing the equations for face recognition. We understand sentences without explicitly listing the grammatical rules we are using. We catch a ball without solving Newton's equations on paper. We often know *how to do things* before we know how to explain what we are doing.

So let us ask a slightly dangerous question. When you looked at these pictures and answered “tree” or “not tree”, did your brain perform a calculation?

In some sense, something like this happened:

```text
image → brain → "tree"
```

or:

```text
image → brain → "not tree"
```

An input was transformed into an output. The transformation was not random. It depended on the structure of the image, your visual system, your memory, your previous experience with trees, and probably the context of the question. That sounds suspiciously like a computation.

But it also feels very different from what we usually call calculation. You did not consciously apply a formal definition. You did not inspect a list of necessary and sufficient conditions. You did not run through a decision tree in your head. You just saw it.

So we arrive at the puzzle of this post:

> Can something be a computation even when we do not know the explicit rule?

To answer this, we need to take a step back and ask what computation was supposed to be in the first place.

## When computers were people

To understand why the tree example is interesting, we need to briefly go back to a time when *computer* did not mean machine.

A computer was a person who computed: someone who followed procedures, manipulated symbols, filled tables, checked numbers, and transformed one written configuration into another. In that sense, computation was not originally associated with electronics. It was associated with rule-following.

This older meaning is useful because it reminds us that computation existed before electronic machines. People could compute using pencil and paper, following a set of instructions step by step to produce a result. The machines came later.

The classical history of computation is, in large part, the history of making this idea precise. First, reasoning becomes something that can be written symbolically. Then symbols become objects that can be manipulated by formal rules. Eventually, those rules become something a machine can implement.


## Let us calculate

The dream of turning thought into calculation is old. [Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz) imagined a future in which disputes between philosophers could be settled like disputes between accountants.

> Quando orientur controversiae, non magis disputatione opus erit inter duos philosophos, quam inter duos computistas. Sufficiet enim calamos in manus sumere sedereque ad abacos, et sibi mutuo (accito si placet amico) dicere: **calculemus**.[^3]

Which translates into:

> If controversies were to arise, there would be no more need of disputation between two philosophers than between two accountants. For it would suffice for them to take their pencils in their hands and to sit down at the abacus, and say to each other (and if they so wish also to a friend called to help): **Let us calculate**.

The idea is seductive: if reasoning could be translated into symbols, and if the manipulation of those symbols followed precise rules, then disagreement could be solved by calculating the solution, *i.e.*, by computation. This is one of the roots of the computational view of the world. Computation is not, at first, about laptops or servers. It is about the possibility of transforming questions into formal operations. Once a problem has been written in the right language, maybe it can simply be calculated.

## Logic becomes algebra

A crucial step in this direction was taken by [George Boole](https://en.wikipedia.org/wiki/George_Boole). Before Boole, logic was mostly studied as a theory of valid arguments: syllogisms, inference rules, and relations between propositions. Boole’s move was to treat logic algebraically. Logical expressions were not only sentences to be judged as true or false; they could be represented by symbols and manipulated through equations.

In modern notation, we are used to writing things like:

```text
A AND B
A OR B
NOT A
```

and treating them almost like algebraic objects. This is so familiar that it is easy to miss how strange the original idea was. Boole introduced an algebra in which symbols could represent classes or propositions, and logical operations could be expressed through algebraic operations. In a modern Boolean algebra, we can think of values as `0` and `1`, where `0` means false and `1` means true.

Then conjunction behaves like multiplication:

```text
A AND B  →  A · B
```

because the result is `1` only when both `A = 1` and `B = 1`. Disjunction behaves like a kind of addition,

```text
A OR B  →  A + B
```

although with the important Boolean constraint that `1 OR 1 = 1`, not `2`. Negation becomes complementation:

```text
NOT A  →  1 - A
```

So logic can be rewritten as algebra over two possible values. For example, the statement

```text
A AND (NOT B)
```

can be written as:

```text
A · (1 - B)
```

and manipulated symbolically.

The important point is not the notation itself. The important point is that logical reasoning becomes calculation. Instead of checking the validity of an argument only by intuition or verbal analysis, one can translate it into symbols and transform those symbols according to formal rules. Boole helped turn logic into a mathematical object. He showed that reasoning could be represented in a symbolic calculus: an algebra of thought.

Of course, Boole’s own system was not identical to the Boolean algebra taught today. The modern formulation was cleaned up and developed later. But the essential move was already there: logical relations could be formalized as algebraic relations.

This matters enormously for the history of computation. Once logic becomes algebra, logical operations can be implemented mechanically. A circuit can compute `A AND B`. Another circuit can compute `NOT A`. More complex circuits can be built by composing simple logical operations.

This is one of the bridges from reasoning to machines: logic becomes algebra, algebra becomes symbolic manipulation, and symbolic manipulation becomes something a machine can implement.

## Formulas become numbers

The next move is even stranger. [Kurt Gödel](https://en.wikipedia.org/wiki/Kurt_G%C3%B6del) showed that formal statements could themselves be encoded as numbers.

This may sound like a technical trick, but it was a conceptual revolution. Before Gödel, one could use mathematics to reason *with* formulas. Gödel showed that, in a precise sense, mathematics could also reason *about* formulas.

The basic idea is simple enough to state, even if the consequences are deep. Suppose we assign a number to each symbol in an expression. For example:

* `2` becomes `1`
* `+` becomes `2`
* `=` becomes `3`
* `4` becomes `4`

Then the expression

```text
2 + 2 = 4
```

can be represented as a sequence:

```text
1, 2, 1, 3, 4
```

Now we want to turn this whole sequence into a single number. To do this, we use prime numbers. Prime numbers have a special property: every positive integer can be factorized into primes in one and only one way. For example:

```text
12 = 2 × 2 × 3
```

and there is no other prime factorization of `12`. This means that prime factorization can be used as a kind of mathematical fingerprint. So we take the first prime numbers,

```text
2, 3, 5, 7, 11, ...
```

and use our sequence as exponents:

```text
1, 2, 1, 3, 4
```

This gives:

```text
2¹ × 3² × 5¹ × 7³ × 11⁴
```

which is just one very large number:

```text
451967670
```

So the formula

```text
2 + 2 = 4
```

has become the number:

```text
451967670
```

Why does this work? Because if I give you the number `451967670`, you can factorize it into primes:

```text
451967670 = 2¹ × 3² × 5¹ × 7³ × 11⁴
```

Then you can read off the exponents:

```text
1, 2, 1, 3, 4
```

And from this sequence, using the code we defined before, you can reconstruct the original formula:

```text
2 + 2 = 4
```

In other words, we have transformed a formula into a number, without losing the information needed to recover the formula. Once formulas can be encoded as numbers, statements about formulas can become statements about numbers. A sentence such as “this formula has a proof” can, in principle, be translated into an arithmetical statement about whether a certain number has a certain property. This is Gödel’s great innovation: syntax becomes arithmetic.

Formal statements, proofs, and rules are no longer only things we manipulate from the outside. They can be represented inside the very mathematical system we are studying. Of course, this is only a toy example. Gödel’s actual construction was more careful and much more powerful. But the conceptual shift is the same: formulas can be expressed as numbers, and reasoning about formulas can become reasoning about numbers.

This is one of the crucial steps toward computation as we understand it today. If symbols can be encoded as numbers, and symbolic operations can be represented as numerical operations, then manipulating symbols becomes something a machine can, at least in principle, do mechanically.

## Machines that manipulate symbols

Then comes [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing). Turing gave a precise mathematical description of what it means for something to be computable. His abstract machine, now called a Turing machine, is almost comically simple. It reads symbols, writes symbols, moves step by step, and follows a finite list of rules.

Despite its simplicity, this model captures a deep idea: computation can be understood as a mechanical procedure. A computation does not require insight, intuition, or understanding. It requires a system that can manipulate symbols according to precise instructions.

This is both beautiful and unsettling. Beautiful, because it gives us a rigorous way to think about computation. Unsettling, because it suggests that at least some parts of reasoning may not require anything like human understanding. They may only require rule-following.

A few years later, the modern digital computer made this idea physical. With the architecture associated with [John von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann), the computer became a general-purpose machine: a machine that stores both data and instructions, and can perform many different computations depending on the program it is given.

This is the familiar picture of computation:

```text
input → explicit rules → output
```

Give the machine symbols. Give it instructions. Let it transform the input into an output.

## But what is a computer?

For the purpose of this post, let us use a deliberately broad definition of computation:

> Computation is the transformation of states according to rules.

This sounds simple, but it already contains three ingredients. First, we need **states**. Something must be able to be in one configuration rather than another: a number written on paper, a voltage in a circuit, the activity of a neuron, the state of a memory register. Second, we need **rules**. The system must change in some structured way. Addition follows rules. A digital circuit follows rules. A formal grammar follows rules. A neural network also follows rules, although these rules may not be written in a form that is easy for us to interpret. Third, and most importantly, we need **interpretation**. Some state of the system must mean something. The symbol `4` means four. A pattern of pixels may mean “tree.” A pattern of neural activity may mean that an animal is about to move left. Without interpretation, we only have a system changing in time.

This is where things become dangerous. Because if computation is just the transformation of states according to rules, then many more things may count as computers than we usually admit.

But before making the definition broader, let us return to the tree.

## Back to the tree

The classical picture of computation is powerful when the rules are explicit. If I ask a computer to calculate

```text
2 + 2
```

there is no mystery about the operation. We know what addition is. We can specify the rule. If I ask whether a number is prime, we can define a procedure. It may be slow or fast, elegant or ugly, but in principle we know what kind of rule we are looking for.

But “is this a tree?” is different. The input is an image. The output is a category. Somewhere between the two, the system has to extract shape, texture, context, prior experience, and a history of examples. The rule is not written explicitly in a form we can easily inspect. Still, the task is solved.

This is the tension. Classical computation looks like:

```text
input → explicit rule → output
```

Tree recognition looks more like:

```text
image → ? → "tree"
```

The question mark is not empty. Something happens there. But whatever happens is not easily expressed as a clean symbolic rule.

So the tree example is not really about trees. It is about the difference between two kinds of knowledge: knowing the rule explicitly and being able to perform the task. Brains are very good at the second kind. Classical computers were historically built around the first. Modern machine learning lives in the strange space between them.

## From brains to artificial neurons

The connection between brains and computation is not new. In 1943, Warren McCulloch and Walter Pitts proposed a mathematical model of neural computation.[[^4]] Their neurons were extremely simplified: little logical units that could be either active or inactive. Yet they showed something remarkable. Networks of such units could implement logical operations. This was one of the first explicit bridges between logic, computation, and the nervous system.

The idea was powerful: perhaps the brain could be understood as a kind of logical machine. Not necessarily a machine made of metal and wires, but a machine made of cells and connections. But there was still something missing. McCulloch and Pitts neurons could implement logical rules, but the rules had to be designed. The structure of the network had to be chosen in advance. In other words, the system could compute, but it did not really learn.

A few years later, Frank Rosenblatt introduced the perceptron[[^5]], one of the ancestors of modern neural networks. The perceptron was inspired by the brain, but it was also a machine for classification. Its task was simple: take an input, such as an image, combine its features with a set of weights, and produce an output category.

In its simplest form, a perceptron works like this. Each input is multiplied by a weight. The weighted inputs are summed together. If the result is above a certain threshold, the perceptron says “yes”; otherwise, it says “no.” Schematically:

```text
inputs → weighted sum → threshold → output
```

For example, imagine we want a machine to decide whether an image contains a tree. We could feed it a list of features extracted from the image: vertical edges, green regions, branching structures, textures, and so on. The perceptron assigns a weight to each feature. Some features push the answer toward “tree”; others push it toward “not tree.” The final answer depends on the total weighted evidence.

The crucial point is that these weights do not have to be written by hand. This is where learning enters the story. During training, the perceptron is shown examples together with the correct answers. It sees an input, produces an output, and then compares its output with the desired one. If it is correct, little or nothing changes. If it is wrong, the weights are adjusted so that the same mistake becomes less likely next time.

So instead of writing the rule explicitly, we provide examples:

```text
this is a tree
this is not a tree
this is a tree
this is not a tree
```

and the system gradually changes its internal parameters until it can separate one category from the other.

This is a gigantic shift. In classical computation, we usually imagine rules written by hand and applied step by step. In the perceptron, the rule is not given in advance. It is distributed across the weights of the system and shaped by experience.

Of course, the perceptron was still extremely limited. It could only learn certain kinds of classifications, and later work showed clearly where those limits were. But conceptually, it opened an important door. It suggested that a machine could perform a task not because we had explicitly programmed the full solution, but because it had learned a useful transformation from examples.

This brings us back to the tree. You probably do not know the formal rule that defines a tree. A perceptron does not know it either. But both point toward the same idea: perhaps intelligent classification does not always require an explicit rule written in advance. Perhaps the rule can be implicit, learned, and stored in the structure of the system itself.


## The strange success of neural networks

Fast forward to today. Many of the most impressive systems in artificial intelligence are neural networks. They recognize images, write this blog post, play games, predict protein structures, produce code, and sometimes confidently say completely wrong things. They are called neural networks because they are very loosely inspired by brains. But they do not run on brains. They usually run on ordinary digital computers.

This creates a strange layering. At the bottom, there is a physical machine: chips, currents, memory, hardware. On top of that, there is a digital computer implementing mathematical operations. On top of that, there is a neural network: a large dynamical system with many parameters. On top of that, there is a task: classify this image, predict the next word, control this robot. And on top of that, there is our interpretation: this output is correct, this answer is useful, this behavior is functional.

So when we say that a neural network “computes,” what exactly are we talking about? The hardware computes. The algorithm computes. The network computes. The task defines what the computation is for. And we decide what the result means.

This is already much messier than the familiar picture of a computer as a box that takes input and gives output.

## What did the tree teach us?

We started with a simple question: is this a tree? The question was easy to answer and hard to formalize. That is the whole point.

The classical history of computation teaches us how symbols can be manipulated by rules. Leibniz dreamed of turning reasoning into calculation. Boole showed that logic could become algebra. Gödel showed that formulas could become numbers. Turing described computation as a mechanical procedure. Digital computers made this procedure physical. This is one of the most powerful intellectual developments in modern science.

But the tree example shows us a crack in the story. Many intelligent tasks are easy to perform and hard to describe. We can recognize objects, faces, voices, gestures, and situations without knowing the explicit rules we use. The brain transforms inputs into meaningful outputs, but not in the same transparent way that a calculator transforms `2 + 2` into `4`.

So perhaps the question is not simply: can the brain calculate? Perhaps the better question is: what do we mean by calculation?

If calculation means explicit symbol manipulation according to rules, then the brain does not look much like a classical computer. But if computation means the structured transformation of states into meaningful outputs, then the brain begins to look suspiciously computational.

This is where Part I stops. So far, computation has moved from explicit rules to learned rules: from logic, to machines, to artificial neural networks.

In Part II, we can push the idea further. If computation is not always explicit symbol manipulation, and if neural networks are already dynamical systems implemented inside digital machines, then perhaps computation is not tied to digital machines either. Perhaps many physical systems can compute. Perhaps the brain is one of them.

But then we need to ask the dangerous question again:

> If many things can compute, what makes something a computer?

---------------------
[^1]: But you can [play Doom a pregnancy tester](https://www.youtube.com/watch?v=V1gcoyo5Ssk) (ok, it is not true, they are just using it as a screen but it is too funny not to mention).

[^2]: Correctly.

[^3]: Gottfried Leibniz, *De arte characteristica ad perficiendas scientias ratione nitentes* (Concerning the art of characterization for perfecting the sciences relying on reason.), 1668

[^4]: McCulloch, W.S., Pitts, W. _A logical calculus of the ideas immanent in nervous activity_,1943.

[^5]: He literally [built it](https://en.wikipedia.org/wiki/Mark_I_Perceptron).