# Objective

The idea of the project is to use JavaScript to visualize the mechanics of the common Computer Science algorithms, so that hopefully it can help people understand some basic yet obscure theories.

- [Project Homepage](http://marty-wang.github.com/Algorithms/)
- [Test Status](http://marty-wang.github.com/Algorithms/test-js/SpecRunner.html)

# Implemented Data Structures and Algorithms

Data Structures

- [Stack](http://marty-wang.github.com/Algorithms/demo/basics.html#stack)
- [Queue](http://marty-wang.github.com/Algorithms/demo/basics.html#queue)

Searching

- Binary Search Tree

# Structure

The **src** folder contains all the algorithm code, and the **demo** folder contains the demo/visualization code. The purpose of such organization is to ensure that these algorithm code can be re-used somewhere else, while the demo/visualization code is merely for visualization.

The code is written in *CoffeeScript*, and the algorithm code is fully tested with *Jasmine*. *Raphael* is used to help visualization.  