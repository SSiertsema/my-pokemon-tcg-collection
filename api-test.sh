#!/bin/bash

# Pokemon TCG API Performance Test Script
# Usage: ./api-test.sh [delay_seconds]
# Example: ./api-test.sh 15

API_KEY="9ccac70d-f279-431e-bac2-086d4846ffe2"
ENDPOINT="https://api.pokemontcg.io/v2/cards?pageSize=10"
DELAY=${1:-0}
REQUESTS=10

echo "========================================"
echo "Pokemon TCG API Performance Test"
echo "========================================"
echo "Date: $(date)"
echo "Endpoint: $ENDPOINT"
echo "Requests: $REQUESTS"
echo "Delay between requests: ${DELAY}s"
echo "API Key: ${API_KEY:0:8}..."
echo "========================================"
echo ""

slow_count=0
total_time=0

echo "=== Test WITH API key ==="
for i in $(seq 1 $REQUESTS); do
    time=$(curl -w "%{time_total}" -o /dev/null -s -H "X-Api-Key: $API_KEY" "$ENDPOINT")

    if (( $(echo "$time > 1" | bc -l) )); then
        echo "Test $i: ${time}s  ❌ SLOW"
        slow_count=$((slow_count + 1))
    else
        echo "Test $i: ${time}s  ✓"
    fi

    total_time=$(echo "$total_time + $time" | bc)

    if [ $i -lt $REQUESTS ] && [ $DELAY -gt 0 ]; then
        sleep $DELAY
    fi
done

echo ""
echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "Slow responses (>1s): $slow_count of $REQUESTS"
echo "Total time: ${total_time}s"
avg=$(echo "scale=3; $total_time / $REQUESTS" | bc)
echo "Average response time: ${avg}s"
echo "========================================"
