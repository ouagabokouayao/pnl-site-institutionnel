import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONFIG = ROOT / "automation/config/sources-veille-pnl.json"
OUT = ROOT / "automation/drafts"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sources = json.loads(CONFIG.read_text(encoding="utf-8"))
    draft = {
        "date_collecte": date.today().isoformat(),
        "statut": "brouillon",
        "validation": "requise",
        "publication_automatique": False,
        "sources_autorisees": [source for source in sources if source.get("actif")],
        "elements": [],
        "note": "Collecte préparatoire. Aucun élément n’est publié dans la veille publique sans validation humaine.",
    }
    path = OUT / f"veille-{date.today().isoformat()}.json"
    path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
