onmessage = async function (e) {
    const { targetHash, charset, length, workerId, startFrom } = e.data;

    async function sha256(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    function generateRandomString(length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    }

    let combinations = startFrom || 0;

    while (true) {
        const candidate = generateRandomString(length);
        const candidateHash = await sha256(candidate);
        combinations++;

        postMessage({
            combinations,
            found: false,
            workerId,
            combinationString: candidate,
            hashedString: candidateHash,
        });

        if (candidateHash === targetHash) {
            postMessage({
                combinations,
                found: true,
                candidate,
                workerId,
                combinationString: candidate,
                hashedString: candidateHash,
            });
            return;
        }
    }
};
