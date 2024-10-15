# Use the official Golang image for building the Go app
FROM golang:1.23-alpine AS builder

# Set up working directories
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Copy the pb_hooks directory to the app
COPY pb_hooks /app/pb_hooks

# Build the Go app
RUN go build -o /app/pocketbase-app ./main.go  
# Update if the entry point is different

# Use a lightweight Alpine image for production
FROM alpine:latest

# Install necessary CA certificates
RUN apk add --no-cache ca-certificates

# Copy the built Go binary from the builder stage
COPY --from=builder /app/pocketbase-app /app/pocketbase-app

COPY --from=builder /app/pb_hooks /app/pb_hooks

# Expose the necessary port
EXPOSE 8090

# Start the Go app
CMD ["/app/pocketbase-app", "serve", "--http=0.0.0.0:8090"]
