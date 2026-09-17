#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CERT_DIR="$PROJECT_ROOT/certs"
KEY_FILE="$CERT_DIR/localhost+3-key.pem"
CERT_FILE="$CERT_DIR/localhost+3.pem"

if ! command -v mkcert >/dev/null 2>&1; then
    echo "mkcert not found. Install it first: https://github.com/FiloSottile/mkcert" >&2
    exit 1
fi

mkdir -p "$CERT_DIR"

names=(localhost 127.0.0.1 ::1)

# Every non-loopback IPv4 (LAN, Wi-Fi, WireGuard/VPN, ...), skipping virtual bridges
while IFS= read -r ip; do
    [ -n "$ip" ] && names+=("$ip")
done < <(
    ip -4 -o addr show \
        | awk '{ print $2, $4 }' \
        | grep -vE '^(virbr|docker|br-|veth|vmnet)' \
        | awk '{ print $2 }' \
        | cut -d/ -f1 \
        | grep -v '^127\.' \
        | sort -u
)

echo "Generating HTTPS certs for: ${names[*]}"

mkcert -key-file "$KEY_FILE" -cert-file "$CERT_FILE" "${names[@]}"

echo
echo "Done. Restart 'npm run dev' so Vite picks up the new certs."
