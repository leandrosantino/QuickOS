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
        uv run pyinstaller \
            --noconfirm \
            --onefile \
            --windowed \
            --add-data "py-src/view:view" \
            --name "bom_viewer" \
            py-src/main.py
        ;;
    *)

    echo "Alias '$alias' não encontrado!" >&2
    echo -e "Aliases disponíveis: dev, build" >&2
    exit 1
    ;;

esac
