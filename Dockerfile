# Use an alpine base image
FROM alpine:latest

# Copy the Pocketbase binary into the container
COPY ./pocketbase /usr/local/bin/pocketbase

# Expose Pocketbase's default port
EXPOSE 8090

# Start Pocketbase when the container starts
CMD ["pocketbase", "serve", "pb.32kb.dev"]
