window.hugeArray = []
let isActive = false
let intervals = []

console.log(
  "%cwindow.crypto.getRandomValues でCPUを使用し、その結果を格納してメモリーを使用します",
  "font-size: 1.5em; color: dodgerblue;"
)

for (let i = 0; i < 25; i++) {
  const interval = setInterval(() => {
    if (isActive) {
      const random = new Uint8Array(65536)
      crypto.getRandomValues(random)
      const data = { timestamp: Date.now(), data: random }
      window.hugeArray.push(data)
    }
  }, 10)
  intervals.push(interval)
}

console.log(
  `%cActive intervals: ${intervals.length}`,
  "color:red; background-color:white; padding:0.5em; border-radius:1em;"
)

setInterval(() => {
  if (isActive)
    document.querySelector("#length").innerText = `${window.hugeArray.length}\n推定 ${
      (65536 * window.hugeArray.length) / 1e9
    }GB`
}, 100)

document.querySelector("#check").addEventListener("change", (e) => {
  isActive = e.target.checked
  console.log(
    "%c" + (isActive ? "Actived" : "Inactived"),
    (isActive ? "color:white; background-color:red;" : "color:white; background-color:blue;") + " padding:0.1em;"
  )
})
