### PRNG (Pseudorandom number generator)
```
Source: Wikipedia
A pseudorandom number generator (PRNG), also known as a deterministic random bit generator (DRBG).
It is an algorithm for generating a sequence of numbers whose properties approximate the properties of sequences of random numbers.
The PRNG-generated sequence is not truly random, because it is completely determined by an initial value, called the PRNG's seed (which may include truly random values).
Although sequences that are closer to truly random can be generated using hardware random number generators, pseudorandom number generators are important in practice for their speed in number generation and their reproducibility.
```
note here: their reproducibility ( meaning that the outcome is the same with the same seed)
note: user who knows the prng algorithm can still be able to cheat their results by knowing the seed in !coinflip, but since we include time, the results will be actually unknown due to the time still moving

Here are some nightbot cmd that I implement with PRNG:

``!coinflip``
```js
$(eval var d=new Date(),s=d.toLocaleDateString('en-GB')+":"+d.getHours()+"/"+d.getMinutes()+"/"+d.getSeconds(),prng=s=>{var h=0;for(var i=0;i<s.length;i++)h=(h<<5)-h+s.charCodeAt(i),h|=0;return Math.abs(h%2)};prng(s)===0?"Heads":"Tails")
```
note: the seed for coinflip is today date + hours + minutes + seconds

``!love``
```js
$(eval var user=`$(user)`.trim(),touser=`$(touser)`.replace(/^@+/,"").trim(),date=new Date().toLocaleDateString('en-GB'),seed=user+touser+date,prng=(s=>{var h=0;for(var i=0;i<s.length;i++)h=(h<<5)-h+s.charCodeAt(i),h|=0;return Math.abs(h%101)});`There is a ${prng(seed)}% chance of love between ${user} and ${touser}.`)
```
note: the seed for love is user name + other user name + today date
note: the outcome will change when the date change to tomorrow

``pp``
```js
$(eval var input=`$(query)`.replace(/^@+/,"").trim();var user=input!==""?input:`$(user)`;var date=new Date().toLocaleDateString('en-GB');var seed=user+date;function seededPRNG(t){for(var e=0,o=0;o<t.length;o++)e=(e<<5)-e+t.charCodeAt(o)|0;return Math.abs(e%21)}var size=seededPRNG(seed);`@${user}, wow, a whopping ${size} inches?`)
```
note: the seed same as above except with the other user name

``!rizz``
```js
$(eval var user=`$(user)`.replace(/^@+/,"").trim(),date=new Date().toLocaleDateString('en-GB'),seed=user+date,prng=s=>{var h=0;for(var i=0;i<s.length;i++)h=(h<<5)-h+s.charCodeAt(i),h|=0;return Math.abs(h%11)};`${user} has ${prng(seed)}/10 rizz DinoDance`)
```
note: the seed are the same the the love cmd


by april. any other inqueries or suggestions go ask me.

