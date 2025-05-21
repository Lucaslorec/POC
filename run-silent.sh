#!/bin/bash
# Run application with all debug logging disabled

# Disable Node.js internal debugging
export NODE_DEBUG=
# Disable application logs
export DISABLE_LOGS=true
# Set log level to error only
export LOG_LEVEL=error

# Run the application
npm run dev

# Or specify a different run command
# npm run start
