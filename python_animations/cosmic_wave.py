from turtle import *
from colorsys import *
tracer(800)
bgcolor("black")
h=0
goto(0,0)
for i in range(70):
    color(hsv_to_rgb(h,1,1))
    h+=0.02
    forward(10)
    circle(i,4,5)
    for j in range(550):
        lt(971)
        circle(i*.1,j, steps=2)
        circle(i,2)
done()