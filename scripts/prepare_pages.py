#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import re
import stat
import shutil
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_BASE_URL = "https://jrxperience.github.io/clean-surface"
LIVE_DOMAIN = "https://www.cleansurfacepressurewashing.com"
SKIP_DIRS = {".git", ".github", ".playwright-cli", "dist-pages", "output", "__pycache__"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Prepare a GitHub Pages build.")
    parser.add_argument("--output", default="dist-pages", help="Output folder relative to repo root.")
    parser.add_argument("--base-url", default=os.environ.get("PAGES_BASE_URL", DEFAULT_BASE_URL))
    return parser.parse_args()


def copy_tree(source: Path, target: Path) -> None:
    if target.exists():
        shutil.rmtree(target, onexc=handle_remove_readonly)
    target.mkdir(parents=True, exist_ok=True)

    for item in source.iterdir():
        if item.name in SKIP_DIRS:
            continue
        destination = target / item.name
        if item.is_dir():
            shutil.copytree(item, destination)
        else:
            shutil.copy2(item, destination)


def rewrite_html(content: str, root_prefix: str, base_url: str) -> str:
    content = content.replace(LIVE_DOMAIN, base_url)
    content = re.sub(r'((?:href|src|action)=["\'])/', rf"\1{root_prefix}", content)
    content = content.replace(f"{base_url}/wp-content/", f"{LIVE_DOMAIN}/wp-content/")
    return content


def rewrite_text(content: str, base_url: str) -> str:
    return content.replace(LIVE_DOMAIN, base_url)


def handle_remove_readonly(func, path, excinfo) -> None:
    os.chmod(path, stat.S_IWRITE)
    func(path)


def main() -> None:
    args = parse_args()
    base_url = args.base_url.rstrip("/")
    parsed = urlsplit(base_url)
    path = parsed.path.strip("/")
    root_prefix = f"/{path}/" if path else "/"

    output_dir = ROOT / args.output
    copy_tree(ROOT, output_dir)

    for file_path in output_dir.rglob("*"):
        if not file_path.is_file():
            continue
        if file_path.suffix.lower() == ".html":
            file_path.write_text(rewrite_html(file_path.read_text(encoding="utf-8"), root_prefix, base_url), encoding="utf-8")
        elif file_path.name in {"robots.txt", "sitemap.xml"}:
            file_path.write_text(rewrite_text(file_path.read_text(encoding="utf-8"), base_url), encoding="utf-8")

    (output_dir / ".nojekyll").write_text("", encoding="utf-8")


if __name__ == "__main__":
    main()
