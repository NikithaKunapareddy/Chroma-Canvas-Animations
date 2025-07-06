from turtle import *
from random import *
speed(0)
bgcolor("black")
colors = ["orange","gold","white"]
for i in range(20):
    for j in range(9):
        for k in range(2):
            color(choice(colors))
            circle(40+i*5, 90)
            fd(100)
            lt(90)
        rt(45)
    hideturtle()
done()