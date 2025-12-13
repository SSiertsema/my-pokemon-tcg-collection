#!/bin/bash

# Pokemon TCG sets to fetch
sets=("xy5" "dc1" "sm7" "sm75" "sm12" "tk1a")

# Arrays to track results
declare -A results
declare -A card_counts

echo "Starting fetch for ${#sets[@]} Pokemon TCG sets..."
echo "Delay between sets: 15 seconds"
echo "=========================================="
echo ""

for i in "${!sets[@]}"; do
  set_id="${sets[$i]}"
  echo "[$((i+1))/${#sets[@]}] Fetching set: $set_id"
  echo "----------------------------------------"

  # Retry logic - try up to 3 times
  max_retries=3
  retry=0
  success=false

  while [ $retry -lt $max_retries ] && [ "$success" = false ]; do
    if [ $retry -gt 0 ]; then
      echo "Retry attempt $retry/$((max_retries-1)) for $set_id..."
      sleep 10
    fi

    # Run the fetch script
    if node scripts/fetch-and-split-cards.js "$set_id"; then
      # Extract card count from the data directory
      cards_file="data/cards/${set_id}-cards.json"
      if [ -f "$cards_file" ]; then
        count=$(jq '.data | length' "$cards_file" 2>/dev/null || echo "unknown")
        results["$set_id"]="SUCCESS"
        card_counts["$set_id"]="$count"
        echo "✓ Set $set_id: SUCCESS ($count cards)"
        success=true
      else
        results["$set_id"]="SUCCESS"
        card_counts["$set_id"]="unknown"
        echo "✓ Set $set_id: SUCCESS (card count unknown)"
        success=true
      fi
    else
      retry=$((retry + 1))
      if [ $retry -lt $max_retries ]; then
        echo "✗ Attempt failed, will retry..."
      fi
    fi
  done

  # Mark as failed if all retries exhausted
  if [ "$success" = false ]; then
    results["$set_id"]="FAILED"
    card_counts["$set_id"]="0"
    echo "✗ Set $set_id: FAILED after $max_retries attempts"
  fi

  echo ""

  # Wait 15 seconds before next set (except after the last one)
  if [ $i -lt $((${#sets[@]} - 1)) ]; then
    echo "Waiting 15 seconds before next set..."
    sleep 15
    echo ""
  fi
done

echo "=========================================="
echo "FINAL REPORT"
echo "=========================================="
echo ""

success_count=0
fail_count=0

for set_id in "${sets[@]}"; do
  status="${results[$set_id]}"
  count="${card_counts[$set_id]}"

  if [ "$status" == "SUCCESS" ]; then
    echo "✓ $set_id: SUCCESS ($count cards)"
    ((success_count++))
  else
    echo "✗ $set_id: FAILED"
    ((fail_count++))
  fi
done

echo ""
echo "----------------------------------------"
echo "Total: ${#sets[@]} sets"
echo "Succeeded: $success_count"
echo "Failed: $fail_count"
echo "=========================================="
