from turtle import *
from colorsys import *
import math
speed(0)
bgcolor("black")
tracer(10)
h = 0
pensize(2)
for i in range(120):
    color(hsv_to_rgb(h,1,1))
    h += 0.008
    up()
    goto(0,0)
    down()
    circle(100, steps=6)
    right(3)
    for j in range(6):
        forward(100)
        right(60)
    right(3)
hideturtle()
done()
