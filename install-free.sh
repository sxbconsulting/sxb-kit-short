#!/usr/bin/env bash
# sxb-kit-short: installs everything the kit needs, free tools only (no paid API, no account).
# Transcription = WhisperX, local and free. Run once per machine, from the kit folder:  ./install-free.sh
# macOS (Homebrew) or Linux (apt). On Windows, run it inside WSL (Ubuntu).
# Option: --no-whisperx  skips the local transcription engine (~2 GB), e.g. if you already have it.
set -euo pipefail
cd "$(dirname "$0")"
WHISPERX=1
[ "${1:-}" = "--no-whisperx" ] && WHISPERX=0
step() { printf '\n==> %s\n' "$*"; }
has() { command -v "$1" >/dev/null 2>&1; }
node_ok() { has node && node -e 'process.exit(parseInt(process.versions.node) >= 20 ? 0 : 1)' 2>/dev/null; }
py_ok() { has python3 && python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)' 2>/dev/null; }

case "$(uname -s)" in
  Darwin)
    if ! has brew; then
      step "Homebrew (free package manager for macOS; it may ask for your Mac password)"
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    for b in /opt/homebrew/bin/brew /usr/local/bin/brew; do [ -x "$b" ] && eval "$("$b" shellenv)" && break; done
    # keep brew on the PATH of every new terminal, zsh (macOS default) and bash alike
    for rc in "$HOME/.zprofile" "$HOME/.bash_profile"; do
      grep -qs 'brew shellenv' "$rc" || echo "eval \"\$($(command -v brew) shellenv)\"" >> "$rc"
    done
    step "node, ffmpeg, python, uv, yt-dlp"
    brew install node ffmpeg python uv yt-dlp
    ;;
  Linux)
    has apt-get || { echo "this script supports macOS and Debian/Ubuntu (apt). Install node 20+, ffmpeg, python 3.10+, uv by hand."; exit 1; }
    SUDO=""; [ "$(id -u)" = 0 ] || SUDO="sudo"
    step "ffmpeg, python, curl"
    $SUDO apt-get update -qq
    $SUDO apt-get install -y -qq ffmpeg python3 python3-pip python3-venv curl ca-certificates
    if ! node_ok; then
      step "Node 20 (NodeSource)"
      curl -fsSL https://deb.nodesource.com/setup_20.x | ${SUDO:+$SUDO -E} bash -
      $SUDO apt-get install -y -qq nodejs
    fi
    if ! has uv; then
      step "uv (Python installer)"
      curl -LsSf https://astral.sh/uv/install.sh | sh
      export PATH="$HOME/.local/bin:$PATH"
    fi
    ;;
  *) echo "unsupported system: $(uname -s). On Windows, install WSL (Ubuntu) and run this script inside it."; exit 1 ;;
esac

node_ok || { echo "Node 20+ is still missing after install, see https://nodejs.org"; exit 1; }
py_ok || { echo "Python 3.10+ is still missing after install, see https://www.python.org/downloads/"; exit 1; }

step "python modules numpy + pillow (for the kit scripts)"
# Homebrew and recent Debian protect the system Python (PEP 668): --user + --break-system-packages installs for you only
python3 -m pip install --quiet --user --break-system-packages numpy pillow 2>/dev/null \
  || python3 -m pip install --quiet --user numpy pillow

if [ "$(uname -s)" = Linux ] && ! has yt-dlp; then
  step "yt-dlp (B-roll from a URL)"
  uv tool install yt-dlp && export PATH="$HOME/.local/bin:$PATH"
fi

if [ "$WHISPERX" = 1 ]; then
  step "WhisperX, free local transcription (~2 GB, can take 10+ minutes)"
  bash scripts/setup-whisperx.sh
fi

step "HyperFrames 0.8.42 and its Chrome (renderer, downloaded once)"
npx --yes hyperframes@0.8.42 --version
npx --yes hyperframes@0.8.42 browser ensure || echo "note: Chrome will be downloaded on the first render instead"

step "final check"
./setup.sh
echo
echo "Done, everything free. Open a new terminal, then start a video:"
echo "  cp -R $(pwd) ~/videos/my-first-reel && cd ~/videos/my-first-reel && claude"
