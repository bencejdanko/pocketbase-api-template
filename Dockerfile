# Use an alpine base image
FROM alpine:latest

# Copy the Pocketbase binary into the container
COPY ./pocketbase /usr/local/bin/pocketbase

# Expose Pocketbase's default port
EXPOSE 80

# Start Pocketbase when the container starts
CMD ["pocketbase", "serve", "--http=0.0.0.0:80"]
