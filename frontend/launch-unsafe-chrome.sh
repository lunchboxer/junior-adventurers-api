#!/usr/bin/env bash

## No need to worry about cors except when running the dev server fortune
## the fronten. In that case just disable cors in the browser.
/usr/bin/google-chrome-unstable --disable-web-security --user-data-dir=~/.config/google-chrome-unsafe http://localhost:8080 &

