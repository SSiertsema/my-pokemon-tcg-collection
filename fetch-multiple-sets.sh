#!/bin/bash

# Sets to fetch
SETS=("hgss4" "bw8" "bw9" "bw10" "xy2" "xy4")
DELAY=15
MAX_RETRIES=3

# Arrays to track results
declare -A SUCCESS_COUNT
declare -A FAILED_SETS

echo "========================================="
echo "Fetching cards for ${#SETS[@]} Pokemon TCG sets"
echo "Delay between sets: ${DELAY} seconds"
echo "Max retries per set: ${MAX_RETRIES}"
echo "========================================="
echo ""

# Function to fetch a single set with retries
fetch_set() {
    local set_id=$1
    local attempt=1

    while [ $attempt -le $MAX_RETRIES ]; do
        echo "[$set_id] Attempt $attempt/$MAX_RETRIES..."

        if node /home/sven/Projects/Pokemon-collectie-app/scripts/fetch-and-split-cards.js "$set_id"; then
            # Extract card count from data file
            local cards_file="/home/sven/Projects/Pokemon-collectie-app/data/cards/${set_id}-cards.json"
            if [ -f "$cards_file" ]; then
                local count=$(grep -o '"id":' "$cards_file" | wc -l)
                SUCCESS_COUNT[$set_id]=$count
                echo "[$set_id] SUCCESS - $count cards fetched"
                return 0
            fi
        fi

        echo "[$set_id] FAILED attempt $attempt"
        attempt=$((attempt + 1))

        if [ $attempt -le $MAX_RETRIES ]; then
            echo "[$set_id] Waiting 5 seconds before retry..."
            sleep 5
        fi
    done

    FAILED_SETS[$set_id]=1
    echo "[$set_id] FAILED after $MAX_RETRIES attempts"
    return 1
}

# Fetch each set
for i in "${!SETS[@]}"; do
    set_id="${SETS[$i]}"
    echo ""
    echo "========================================="
    echo "Processing set $((i+1))/${#SETS[@]}: $set_id"
    echo "========================================="

    fetch_set "$set_id"

    # Add delay between sets (except after the last one)
    if [ $i -lt $((${#SETS[@]} - 1)) ]; then
        echo ""
        echo "Waiting ${DELAY} seconds before next set..."
        sleep $DELAY
    fi
done

# Final report
echo ""
echo "========================================="
echo "FINAL REPORT"
echo "========================================="
echo ""

if [ ${#SUCCESS_COUNT[@]} -gt 0 ]; then
    echo "SUCCESSFUL SETS:"
    for set_id in "${!SUCCESS_COUNT[@]}"; do
        echo "  ✓ $set_id: ${SUCCESS_COUNT[$set_id]} cards"
    done
    echo ""
fi

if [ ${#FAILED_SETS[@]} -gt 0 ]; then
    echo "FAILED SETS:"
    for set_id in "${!FAILED_SETS[@]}"; do
        echo "  ✗ $set_id"
    done
    echo ""
fi

echo "Summary: ${#SUCCESS_COUNT[@]} succeeded, ${#FAILED_SETS[@]} failed out of ${#SETS[@]} total"
echo "========================================="
