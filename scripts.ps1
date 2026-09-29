param (
    [Parameter(Mandatory=$true)]
    [string]$Alias
)

switch ($Alias.ToLower()) {

    "dev"  { concurrently --kill-others `
        "bun dev" `
        "wait-on tcp:5173 && bun run app" 
    }

    "build"    { uv run pyinstaller `
        --noconfirm `
        --onefile `
        --windowed `
        --add-data "py-src/view;view" `
        --name "bom_viewer.exe" `
        py-src/main.py 
    }

    Default { 
        Write-Warning "Alias '$Alias' não encontrado!" 
        Write-Host "Aliases disponíveis: limpar, rede, pandas, compilar" -ForegroundColor Cyan
    }
}