#!/bin/bash
# Execute server.js, which is output using "next build"

[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache

exec node server.js