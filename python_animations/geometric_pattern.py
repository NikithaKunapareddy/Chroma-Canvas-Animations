from turtle import *
from colorsys import *
tracer(2)
bgcolor("black")
pensize(2)
h=0
for i in range(70):
    color(hsv_to_rgb(h,1,0.9))
    h+=0.01
    right(150)
    circle(i, 180)
    for j in range(5):
        forward(i)
        right(45)
        left(8)
    right(115)
hideturtle()
done()
