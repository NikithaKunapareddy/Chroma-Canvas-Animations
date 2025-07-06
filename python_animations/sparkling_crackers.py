from turtle import *
import random
import time

speed(0)
bgcolor("black")
hideturtle()
tracer(0)

# Get screen/window size dynamically
screen = getscreen()
width = screen.window_width()
height = screen.window_height()

# Gold and silver color palettes
GOLD = (1.0, 0.84, 0.0)
SILVER = (0.85, 0.85, 0.85)

# Function to draw a single cracker (rocket)
def draw_cracker(x, y, angle, color_rgb, burst_radius):
    penup()
    goto(x, y)
    setheading(angle)
    pendown()
    # Draw rocket trail (thin, gold/silver)
    width(2)
    for i in range(18):
        color(color_rgb)
        forward(burst_radius * 0.07)
        if i % 3 == 0:
            dot(4, color_rgb)
    # Draw rocket burst (sparkly, less cluttered)
    penup()
    forward(burst_radius * 0.07)
    width(3)
    for i in range(14):
        setheading(angle + i * (360/14))
        pendown()
        color(color_rgb)
        forward(burst_radius * 0.27)
        dot(int(burst_radius * 0.07), color_rgb)
        penup()
        backward(burst_radius * 0.27)
    penup()
    goto(x, y)
    width(1)

# Fade effect (draw a semi-transparent black rectangle)
def fade():
    penup()
    goto(-width//2, height//2)
    pendown()
    color(0,0,0,0.15)
    begin_fill()
    for _ in range(2):
        forward(width)
        right(90)
        forward(height)
        right(90)
    end_fill()
    penup()

# Launch multiple crackers from the bottom
for launch in range(14):
    x = random.randint(-width//2 + 40, width//2 - 40)
    y = -height//2 + 20
    angle = random.randint(75, 105)
    color_rgb = GOLD if random.random() < 0.5 else SILVER
    burst_radius = random.randint(int(width*0.18), int(width*0.28))
    draw_cracker(x, y, angle, color_rgb, burst_radius)
    update()
    time.sleep(0.5)
    fade()

# Show all crackers for a moment
update()
time.sleep(2)
