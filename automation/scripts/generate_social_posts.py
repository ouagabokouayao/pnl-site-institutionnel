import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "assets/data/journees-2026-pnl.json"
OUT = ROOT / "automation/social-posts"
NETWORKS = ["Facebook", "LinkedIn", "Instagram", "TikTok", "X", "Threads", "Bluesky", "WhatsApp"]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    journees = json.loads(DATA.read_text(encoding="utf-8"))
    for item in journees:
        for network in NETWORKS:
            payload = {
                "reseau": network,
                "date": item["date"],
                "titre": item["titre"],
                "texte_court": item["message_fort"],
                "texte_long": item["legende_courte"],
                "hashtags": ["#ProtégeonsNotreLittoral", "#Littoral", "#Environnement"],
                "image": item["image"],
                "lien_site": f"https://protegeonsnotrelittoral.org/{item.get('programme_lie', 'calendrier-evenements.html')}",
                "statut": "brouillon",
                "validation": "requise",
                "publication_automatique": False,
            }
            path = OUT / f"{item['slug']}-{network.lower()}.json"
            path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
