#!/usr/bin/env bash
set -euo pipefail

alias="${1:-}"

case "${alias,,}" in

    dev)
        concurrently --kill-others \
            "bun dev" \
            "wait-on tcp:5173 && bun run app" 
        ;;
        

    build)
        engine="$(uv run python -c "from prisma.client import BINARY_PATHS; from prisma.binaries import platform; print(BINARY_PATHS.query_engine[platform.binary_platform()])")"
        uv run pyinstaller \
            --noconfirm \
            --onefile \
            --add-data "web:view" \
            --collect-all prisma \
            --add-binary "${engine}:." \
            --runtime-hook "prisma_runtime_hook.py" \
            --name "quick-os" \
            src-py/main.py

        mkdir -p dist/public dist/database
        cp -r public/. dist/public/

        if [ ! -f dist/database/app.db ]; then
            cp -r database/. dist/database/
        fi

        if [ ! -f dist/.env ]; then
            cp .env.production dist/.env
        fi
        ;;
    *)

    echo "Alias '$alias' não encontrado!" >&2
    echo -e "Aliases disponíveis: dev, build" >&2
    exit 1
    ;;

esac
