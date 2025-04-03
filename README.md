# PocketBase API Template (In Progress)
This repository serves as a template and guide for setting up a PocketBase-powered backend, demonstrating how to develop APIs using both JavaScript and Golang while leveraging PocketBase’s built-in features.

## Why PocketBase?
PocketBase is an extremely lightweight backend that runs on SQLite and comes with an admin interface for managing collections, authentication, and policies. This makes it a strong candidate for multi-tenant applications due to its low cost, easy provisioning, and simplicity in deployment.

## What's Inside?
PocketBase API Setup:

Uses a Golang-based setup importing PocketBase and registering the same hooks used for JavaScript-based API development.

Demonstrates how to structure and extend PocketBase beyond its default binary.

Experimental API Routes:

Includes various test endpoints and integrations, including LLM-based features and a basic flashcard/questionnaire system.

Docker & Deployment:

A Docker image for containerized setups.

A Dokku deployment example, making it easy to self-host.

## What This Becomes
This repo is evolving into a template for building and deploying PocketBase-based backends, with a focus on multi-tenancy, lightweight deployment, and flexibility. Whether you're using PocketBase for a small-scale project or as an API layer in a larger system, this serves as a practical starting point.

## LLM Integration Potential
One of the unique advantages of PocketBase is how SQLite and file storage (S3-compatible) are directly exposed in a local directory. This allows an LLM to interact with the database—querying, analyzing, and even modifying data. Additionally, since PocketBase’s file storage system can be configured to operate within a local directory, an LLM could theoretically access stored files, making it a powerful backend for AI-driven applications.

### Commands

git remote -v to get remotes

git push dokku-lan main

add ssl with letencrypt plugin: dokku letsencrypt:cron-job --add