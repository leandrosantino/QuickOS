import os
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    base = Path(sys.executable).parent

    if hasattr(sys, "_MEIPASS"):
        for candidate in Path(sys._MEIPASS).glob("query-engine*"):
            os.environ["PRISMA_QUERY_ENGINE_BINARY"] = str(candidate)
            break

    template_dir = base / "public"
    template_dir.mkdir(parents=True, exist_ok=True)
    os.environ["SERVICE_ORDER_TEMPLATE_DIR"] = str(template_dir)

    database_dir = base / "database"
    database_dir.mkdir(parents=True, exist_ok=True)
    os.environ["DATABASE_URL"] = f"file:{(database_dir / 'app.db').resolve()}"
