import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "assets/data/journees-2026-pnl.json"
OUT = ROOT / "automation/articles"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    journees = json.loads(DATA.read_text(encoding="utf-8"))
    for item in journees:
        path = OUT / f"{item['slug']}.md"
        content = f"""---
type: article-brouillon
date: {item['date']}
statut: brouillon
validation: requise
---

# {item['titre']}

Message fort : {item['message_fort']}

Texte proposé :
{item['legende_courte']}

Lien programme :
{item.get('programme_lie', '')}
"""
        path.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
