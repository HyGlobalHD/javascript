onmessage = async function (e) {
    const { targetHash, charset, length, workerId, startFrom, combinationsPerWorker } = e.data;

    async function sha256(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function generateCombination(index, length) {
        let result = "";
        let temp = index;
        for (let i = 0; i < length; i++) {
            result = charset[temp % charset.length] + result;
            temp = Math.floor(temp / charset.length);
        }
        return result;
    }


    function getRandomValuesArray(length, charsetLength) {
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);  // Get cryptographically secure random numbers

      let combination = '';
      for(let i = 0; i < length; ++i){
        combination += charset[arr[i] % charsetLength];
      }
      return combination
    }

    let combinationsTried = 0;
    let startIndex = startFrom; 
    
    try {

      // Check browser compatibility and generate random or sequential
      let generateFunction = (typeof crypto !== 'undefined' && crypto.getRandomValues) ? getRandomValuesArray : generateCombination;
      
      for (let i = startIndex; i < startIndex + combinationsPerWorker; i++) {

        const candidate = generateFunction(i, length, charset.length);
        const candidateHash = await sha256(candidate);
        combinationsTried++;

        postMessage({
            combinations: combinationsTried,
            found: candidateHash === targetHash,
            workerId,
            combinationString: candidate,
            hashedString: candidateHash,
            combinationIndex: i
        });


        if (candidateHash === targetHash) {
            return; // Stop if found
        }
      }


    } catch (error) {
      postMessage({ error: error.message }); // Handle errors more robustly
    }
};
