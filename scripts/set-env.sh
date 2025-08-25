#!/bin/bash
rm packages/server/config/.env
rm packages/client/.env
cp scripts/.env.client packages/client/.env
cp scripts/.env.server packages/server/config/.env