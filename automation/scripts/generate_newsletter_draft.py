import json
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "automation/newsletters"


def load_json(rel: str, fallback):
    path = ROOT / rel
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    journees = load_json("assets/data/journees-2026-pnl.json", [])
    actualites = [item for item in load_json("assets/data/actualites-pnl.json", []) if item.get("statut") == "publie"]
    veille = load_json("assets/data/veille-littorale-pnl.json", [])
    by_month = defaultdict(list)
    for item in journees:
        by_month[item["date"][:7]].append(item)
    today = date.today().isoformat()
    content = [
        "---",
        "type: newsletter-brouillon",
        f"date: {today}",
        "statut: brouillon",
        "validation: requise",
        "envoi_automatique: false",
        "---",
        "",
        "Objet proposé : Nouvelles publiques de Protégeons notre Littoral",
        "",
        "<h1>Nouvelles publiques de Protégeons notre Littoral</h1>",
        "",
        "## Journées importantes 2026",
    ]
    for month, items in sorted(by_month.items()):
        content.append(f"### {month}")
        for item in items:
            content.append(f"- {item['date']} — {item['titre']} : {item['message_fort']}")
    content.extend(["", "## Actualités PNL publiées"])
    if actualites:
        for item in actualites:
            content.append(f"- {item.get('date', '')} — {item.get('titre', '')}")
    else:
        content.append("- Aucune actualité nouvelle à intégrer sans validation.")
    content.extend(["", "## Veille validée"])
    if veille:
        for item in veille:
            content.append(f"- {item.get('titre', '')}")
    else:
        content.append("- Aucune veille publique validée pour le moment.")
    (OUT / f"newsletter-brouillon-{today}.md").write_text("\n".join(content) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
