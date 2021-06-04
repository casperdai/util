export function blobToString (blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsBinaryString(blob)
  })
}

export async function blobToHex (blob) {
  const val = await blobToString(blob)
  return val.split('')
          .map(v => v.charCodeAt())
          .map(v => v.toString(16).toUpperCase())
          .map(v => v.padStart(2, '0'))
          .join(' ')
}

export function blobToArrayBuffer (blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(blob)
  })
}

export function createChunks (blob, chunkSize = 1 * 1024 * 1024) {
  const chunks = []
  try {
    let cur = 0
    while (cur < blob.size) {
      chunks.push({ index: cur, chunk: blob.slice(cur, cur + chunkSize) })
      cur += chunkSize
    }
  } catch (e) {
    console.error(e)
  }
  return chunks
}
