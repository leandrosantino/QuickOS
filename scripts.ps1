param (
    [Parameter(Mandatory=$true)]
    [string]$Alias
)

switch ($Alias.ToLower()) {

    "dev"  { concurrently --kill-others `
        "bun dev" `
        "wait-on tcp:5173 && bun run app" 
    }

    "build"    {
        $engine = uv run python -c "from prisma.client import BINARY_PATHS; from prisma.binaries import platform; print(BINARY_PATHS.query_engine[platform.binary_platform()])"
        uv run pyinstaller `
            --windowed `
            --noconfirm `
            --onefile `
            --add-data "web;view" `
            --collect-all prisma `
            --add-binary "$engine;." `
            --runtime-hook "prisma_runtime_hook.py" `
            --name "quick-os.exe" `
            src-py/main.py

        if ($?) {
            New-Item -ItemType Directory -Force "dist\public"   | Out-Null
            New-Item -ItemType Directory -Force "dist\database" | Out-Null
            Copy-Item -Path "public\*" -Destination "dist\public" -Recurse -Force

            if (-not (Test-Path "dist\database\app.db")) {
                Copy-Item -Path "database\*" -Destination "dist\database" -Recurse -Force
            }

            if (-not (Test-Path "dist\.env")) {
                Copy-Item -LiteralPath ".env.production" -Destination "dist\.env"
            }
        }
    }

    Default { 
        Write-Warning "Alias '$Alias' não encontrado!" 
        Write-Host "Aliases disponíveis: limpar, rede, pandas, compilar" -ForegroundColor Cyan
    }
}