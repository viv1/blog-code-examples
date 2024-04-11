# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install uWSGI and vim
RUN apt-get update && apt-get install -y build-essential vim
RUN pip install uwsgi

# Copy the app.py file into the container at /app
COPY app_main.py /app

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run uWSGI
CMD ["uwsgi", "--http", "0.0.0.0:8000", "--wsgi-file", "app_main.py", "--master", "--processes", "5"]
