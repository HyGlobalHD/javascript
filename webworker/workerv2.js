onmessage = async function(e) {
    const { targetHash, charset, length, workerId, startFrom, workPerWorker } = e.data;

    async function sha256(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    function generateString(index, length, charset) {
        let result = '';
        let temp = index;
        for (let i = 0; i < length; i++) {
            result = charset[temp % charset.length] + result;
            temp = Math.floor(temp / charset.length);
        }
        return result;
    }

    let combinations = 0;
    for (let i = startFrom; i < startFrom + workPerWorker && !self.paused; i++) {
      const candidate = generateString(i,length,charset);
      const candidateHash = await sha256(candidate);
      combinations++;

      postMessage({
          combinations,
          found: candidateHash === targetHash,
          candidate: candidateHash === targetHash ? candidate : null,
          workerId,
          combinationString: candidate,
          hashedString: candidateHash,
      });
      if(candidateHash === targetHash) break;
    }
};
