from turtle import*
from colorsys import *
bgcolor('black')
tracer(20)
hideturtle()
c=0
n=1
p=True
goto(-150,-60)
down()
while True:
    c +=0.004
    color(hsv_to_rgb(c,1,1))
    circle(n)
    if p:
        n=n-1
    else:
        n=n+1
        left(3)
        fd(2)
    if n==0 or n==60:
        p = not p
    rt(4)
    fd(1.5)