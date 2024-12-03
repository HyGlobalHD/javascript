onmessage = async function (e) {
    const { targetHash, charset, length, workerId } = e.data;

    async function sha256(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    function generateNextCombination(current) {
        let result = current;
        if (!current) {
            result = charset[0].repeat(length); // Start from the first combination
        } else {
            let i = length - 1;
            while (i >= 0) {
                const nextIndex = charset.indexOf(result[i]) + 1;
                if (nextIndex < charset.length) {
                    result = result.slice(0, i) + charset[nextIndex] + result.slice(i + 1);
                    break;
                } else {
                    result = result.slice(0, i) + charset[0] + result.slice(i + 1);
                    i--;
                }
            }
        }
        return result;
    }

    let combinations = 0;
    let currentCombination = null;

    while (true) {
        currentCombination = generateNextCombination(currentCombination);
        combinations++;

        // Check with the main thread if the combination has been tried
        const alreadyTried = postMessage({
            command: "checkCombination",
            combination: currentCombination,
        });

        if (alreadyTried) continue;

        const candidateHash = await sha256(currentCombination);

        postMessage({
            combinations,
            found: false,
            workerId,
            combinationString: currentCombination,
            hashedString: candidateHash,
        });

        if (candidateHash === targetHash) {
            postMessage({
                combinations,
                found: true,
                candidate: currentCombination,
                workerId,
                combinationString: currentCombination,
                hashedString: candidateHash,
            });
            return;
        }
    }
};
